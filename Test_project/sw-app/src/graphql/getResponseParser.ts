/* eslint-disable no-unused-vars */
// @ts-nocheck
import { ApolloQueryResult } from "@apollo/client";
import { IntrospectionField } from "graphql";
import { DELETE_MANY, GET_LIST, GET_MANY, GET_MANY_REFERENCE } from "ra-core";
import { IntrospectedResource, IntrospectionResult } from "ra-data-graphql";

export default (_introspectionResults: IntrospectionResult) =>
  (
    raFetchMethod: string,
    _resource: IntrospectedResource,
    _queryType: IntrospectionField
  ) =>
  (response: ApolloQueryResult<any>) => {
    const data = response.data;

    if (
      raFetchMethod === GET_LIST ||
      raFetchMethod === GET_MANY_REFERENCE
    ) {
      return {
        data: response.data.items.map(sanitizeResource),
        total: response.data.total,
      };
    }


    if (raFetchMethod === GET_MANY) {
      return {
        data: response.data.data.map(sanitizeResource),
      };
    }

    if (raFetchMethod === DELETE_MANY) {
      return {
        data: response.data.data.map(sanitizeResource),
      };
    }

    return { data: sanitizeResource(data.data) };
  };

const sanitizeResource = (data: any) => {
  const result = Object.keys(data).reduce((acc, key) => {
    if (key.startsWith("_")) {
      return acc;
    }

    const dataForKey = data[key];

    if (dataForKey === null || dataForKey === undefined) {
      return acc;
    }

    if (Array.isArray(dataForKey)) {
      if (
        typeof dataForKey[0] === "object" &&
        dataForKey[0] != null &&
        // If there is no id, it's not a reference but an embedded array
        dataForKey[0].id != null
      ) {
        return {
          ...acc,
          [key]: dataForKey.map(sanitizeResource),
          [`${key}Ids`]: dataForKey.map((d) => d.id),
        };
      } else {
        return { ...acc, [key]: dataForKey };
      }
    }

    if (
      typeof dataForKey === "object" &&
      dataForKey != null &&
      // If there is no id, it's not a reference but an embedded object
      dataForKey.id != null
    ) {
      return {
        ...acc,
        ...(dataForKey &&
          dataForKey.id && {
            [`${key}.id`]: dataForKey.id,
          }),
        // We should only sanitize gql types, not objects
        [key]: dataForKey.__typename
          ? sanitizeResource(dataForKey)
          : dataForKey,
      };
    }

    return { ...acc, [key]: dataForKey };
  }, {});

  return result;
};
