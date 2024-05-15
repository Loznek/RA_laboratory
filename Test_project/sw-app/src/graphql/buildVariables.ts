// @ts-nocheck
import {
  IntrospectionField,
  IntrospectionInputObjectType,
  IntrospectionType,
} from "graphql";
import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
} from "ra-core";
import { IntrospectedResource, IntrospectionResult } from "ra-data-graphql";

import getFinalType from "./getFinalType";
import isList from "./isList";

export default (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    raFetchMethod: string,
    params: any,
    queryType: IntrospectionField
  ) => {

    console.log(params);
    const preparedParams = prepareParams(params);

    switch (raFetchMethod) {
      case GET_LIST: {
        return buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams
        );
      }
      case GET_MANY:
        return {
          filter: { ids: preparedParams.ids },
        };
      case GET_MANY_REFERENCE: {
        const type = getFinalType(
          resource[raFetchMethod].args.find((a) => a.name === "where").type
        );
        const filter = introspectionResults.types.find(
          (t) => t.name === type.name
        );

        const finalFilter = filter.inputFields.find(
          (f) => f.name === preparedParams.target
        ).type;
        const targetFilter = finalFilter.name.endsWith("ManyRelationFilter")
          ? { some: { id: { equals: preparedParams.id } } }
          : { id: { equals: preparedParams.id } };

        let variables = buildGetListVariables(introspectionResults)(
          resource,
          raFetchMethod,
          preparedParams
        );
        variables.where = {
          ...variables.where,
          [preparedParams.target]: targetFilter,
        };

        return variables;
      }
      case GET_ONE:
      case DELETE:
        return {
          where: { id: preparedParams.id },
        };
      case DELETE_MANY:
        return {
          where: preparedParams.ids.map((id) => ({ id })),
        };
      case CREATE:
      case UPDATE: {

        return buildCreateUpdateVariables(
          resource,
          raFetchMethod,
          preparedParams,
          queryType
        );
      }
    }
  };

const sanitizeValue = (type: IntrospectionType, value: any) => {
  if (type.name === "Int") {
    return parseInt(value, 10);
  }

  if (type.name === "Float") {
    return parseFloat(value);
  }

  return value;
};

const isValidDateString = (str: string): boolean => {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(str);
};

const prepareParams = (params: any) => {
  let result = {};

  if (!(params instanceof Object) || !params) {
    return params;
  }

  for (const key in params) {
    const param = params[key];
    if (!param) {
      result[key] = param;
    } else if (param instanceof File) {
      result = { file: { upload: param } };
      break;
    } else if (param instanceof Date || isValidDateString(param)) {
      result[key] = new Date(param).toISOString();
    } else if (param instanceof Object && !Array.isArray(param)) {
      result[key] = prepareParams(param);
    } else if (
      Array.isArray(param) &&
      param.some((item) => item instanceof Object)
    ) {
      result[key] = param.map((p) => prepareParams(p));
    } else {
      result[key] = param;
    }
  }

  return result;
};

const buildGetListVariables =
  (introspectionResults: IntrospectionResult) =>
  (resource: IntrospectedResource, raFetchMethod: string, params: any) => {
    let variables: Partial<{
      where: { [key: string]: any };
      page: number;
      perPage: number;
      sortField: string;
      sortOrder: string;
    }> = { filter: {} };
    if (params.filter) {
      console.log("params.filter", params.filter);
      variables.where = Object.keys(params.filter).reduce((acc, key) => {
        if (key === "ids") {
          return { ...acc, ids: params.filter[key] };
        }

        if (typeof params.filter[key] === "object") {
          const type = introspectionResults.types.find(
            (t) => t.name === `${resource.type.name}WhereInput`
          );
          const filterSome = (
            type as IntrospectionInputObjectType
          )?.inputFields?.find((t) => t.name === `${key}`);

          if (filterSome) {
            if (Array.isArray(params.filter[key])) {
              const filter = { in: params.filter[key] };
              return { ...acc, [key]: filter };
            }
            const filter = Object.keys(params.filter[key]).reduce((acc, k) => {
              return {
                ...acc,
                [k]: params.filter[key][k],
              };
            }, {});

            return { ...acc, [key]: filter };
          }
        }

        const parts = key.split(".");

        if (parts.length > 1) {
          if (parts[1] === "id") {
            const type = introspectionResults.types.find(
              (t) => t.name === `${resource.type.name}Filter`
            );
            const filterSome = (
              type as IntrospectionInputObjectType
            )?.inputFields?.find((t) => t.name === `${parts[0]}_some`);

            if (filterSome) {
              return {
                ...acc,
                [`${parts[0]}_some`]: { id: params.filter[key] },
              };
            }

            return { ...acc, [parts[0]]: { id: params.filter[key] } };
          }

          const resourceField = resource.type.fields.find(
            (f) => f.name === parts[0]
          );
          const type = getFinalType(resourceField.type);
          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        const resourceField = resource.type.fields.find((f) => f.name === key);

        if (resourceField) {
          const type = getFinalType(resourceField.type);
          const isAList = isList(resourceField.type);

          if (isAList) {
            return {
              ...acc,
              [key]: Array.isArray(params.filter[key])
                ? params.filter[key].map((value) => sanitizeValue(type, value))
                : sanitizeValue(type, [params.filter[key]]),
            };
          }

          return {
            ...acc,
            [key]: sanitizeValue(type, params.filter[key]),
          };
        }

        return { ...acc, [key]: params.filter[key] };
      }, {});
    }

    if (params.pagination) {
      variables.take = parseInt(params.pagination.perPage, 10);
      variables.skip =
        (parseInt(params.pagination.page, 10) - 1) * variables.take;
    }

    if (params.sort) {
      variables.orderBy = {
        [params.sort.field]: params.sort.order.toLowerCase(),
      };
      variables.sortField = params.sort.field;
      variables.sortOrder = params.sort.order;
    }

    return variables;
  };

const buildCreateUpdateVariables = (
  resource: IntrospectedResource,
  raFetchMethod,
  { id, data }: any,
  // eslint-disable-next-line no-unused-vars
  queryType: IntrospectionField
) => {
  console.log("buildCreateUpdateVariables", { id, data });
  return Object.keys(data).reduce(
    (acc, key) => {
      console.log("here0", key, data[key]);
      if(key.endsWith("Ids")) {
        return {
          ...acc,
          data: {
            ...acc.data
          },
        };
      }
      if (Array.isArray(data[key])) {
        const relations = { connect: [], create: [] };
        if(Array.isArray(data[key][0])){
        }
        data[key].forEach((element) => {
          console.log("element", element);
          if (element.id) {
            relations.connect.push({ id: element.id });
          }
          else if( typeof element === 'string'){
            relations.connect.push({ id: element });
          }
          else {
            relations.create.push(element);
          }
        });

        return {
          ...acc,
          data: {
            ...acc.data,
            [key]: relations,
          },
        };
      }

      if (typeof data[key] === "object") {
        var relations = { connect :null , create: null, disconnect: null};
          if ( data[key].id) {
            relations.connect = { id:  data[key].id };
            relations.create = null;
          } else {
            if(data[key]) {
              relations.create = data[key];
            }
            else relations.create = null;
            relations.connect = null;

          }
        ;
        var output = {connect: relations.connect}
        return {
          ...acc,
          data: {
            ...acc.data,
            [key]: output,
          },
        };
        //return acc;
        /* const arg = queryType.args.find((a) => a.name === `${key}Id`);

        if (arg) {
          return {
            ...acc,
            [`${key}Id`]: data[key].id,
          };
        }*/
      }
      if (key === "id" || key.endsWith("Count") || key.includes(".")) {
        console.log("here3");
        // TODO HACK
        return acc;
      }

      return {
        ...acc,
        data: { ...acc.data, [key]: data[key] },
      };
    },
    { where: { id }, data: {} }
  );
};
