// @ts-nocheck
import {
  ArgumentNode,
  IntrospectionField,
  IntrospectionNamedTypeRef,
  IntrospectionObjectType,
  IntrospectionUnionType,
  TypeKind,
  VariableDefinitionNode,
} from "graphql";
import * as gqlTypes from "graphql-ast-types-browser";
import { GET_LIST, GET_MANY, GET_MANY_REFERENCE } from "ra-core";
import {
  IntrospectedResource,
  IntrospectionResult,
  QUERY_TYPES,
} from "ra-data-graphql";
import { getGqlType } from "./getGqlType";

import getFinalType from "./getFinalType";

export default (introspectionResults: IntrospectionResult) =>
  (
    resource: IntrospectedResource,
    raFetchMethod: string,
    queryType: IntrospectionField,
    variables: any
  ) => {
    const { ...metaVariables } = variables;
    const apolloArgs = buildApolloArgs(queryType, variables);
    const args = buildArgs(queryType, variables);
    const metaArgs = buildArgs(queryType, metaVariables, true);
    const fields = buildFields(introspectionResults)(resource.type.fields);
    if (
      raFetchMethod === GET_LIST ||
      raFetchMethod === GET_MANY_REFERENCE
    ) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          "query",
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name("items"),
              args,
              null,
              gqlTypes.selectionSet(fields)
            ),
            gqlTypes.field(
              gqlTypes.name(`${queryType.name}Count`),
              gqlTypes.name("total"),
              metaArgs,
              null
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs
        ),
      ]);
    }

    return gqlTypes.document([
      gqlTypes.operationDefinition(
        QUERY_TYPES.includes(raFetchMethod) ? "query" : "mutation",
        gqlTypes.selectionSet([
          gqlTypes.field(
            gqlTypes.name(queryType.name),
            gqlTypes.name("data"),
            args,
            null,
            gqlTypes.selectionSet(fields)
          ),
        ]),
        gqlTypes.name(queryType.name),
        apolloArgs
      ),
    ]);
  };

export const buildFields =
  (introspectionResults: IntrospectionResult, paths = []) =>
  (fields) =>
    fields.reduce((acc, field) => {
      const type = getFinalType(field.type);

      if (type.name.startsWith("_")) {
        return acc;
      }

      if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
        return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
      }

      const linkedResource = introspectionResults.resources.find(
        (r) => r.type.name === type.name
      );

      if (linkedResource) {
        return [
          ...acc,
          gqlTypes.field(
            gqlTypes.name(field.name),
            null,
            null,
            null,
            gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name("id"))])
          ),
        ];
      }

      const linkedType = introspectionResults.types.find(
        (t) => t.name === type.name
      );

      if (linkedType && !paths.includes(linkedType.name)) {
        const possibleTypes =
          (linkedType as IntrospectionUnionType).possibleTypes || [];
        return [
          ...acc,
          gqlTypes.field(
            gqlTypes.name(field.name),
            null,
            null,
            null,
            gqlTypes.selectionSet([
              ...buildFragments(introspectionResults)(possibleTypes),
              ...buildFields(introspectionResults, [...paths, linkedType.name])(
                (linkedType as IntrospectionObjectType).fields
              ),
            ])
          ),
        ];
      }

      // NOTE: We might have to handle linked types which are not resources but will have to be careful about
      // ending with endless circular dependencies
      return acc;
    }, []);

export const buildFragments =
  (introspectionResults: IntrospectionResult) =>
  (
    possibleTypes: readonly IntrospectionNamedTypeRef<IntrospectionObjectType>[]
  ) =>
    possibleTypes.reduce((acc, possibleType) => {
      const type = getFinalType(possibleType);
      const linkedType = introspectionResults.types.find(
        (t) => t.name === type.name
      );

      return [
        ...acc,
        gqlTypes.inlineFragment(
          gqlTypes.selectionSet(
            buildFields(introspectionResults)(
              (linkedType as IntrospectionObjectType).fields
            )
          ),
          gqlTypes.namedType(gqlTypes.name(type.name))
        ),
      ];
    }, []);

export const buildArgs = (
  query: IntrospectionField,
  variables: any,
  isMeta = false
): ArgumentNode[] => {
  if (query.args.length === 0) {
    return [];
  }

  let validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== "undefined"
  );
  if (isMeta) {
    validVariables = ["where"];
  }

  let args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name))
        ),
      ],
      []
    );
  return args;
};

export const buildApolloArgs = (
  query: IntrospectionField,
  variables: any
): VariableDefinitionNode[] => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== "undefined"
  );

  let args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce((acc, arg) => {
      return [
        ...acc,
        gqlTypes.variableDefinition(
          gqlTypes.variable(gqlTypes.name(arg.name)),
          getGqlType(arg.type)
        ),
      ];
    }, []);

  return args;
};
