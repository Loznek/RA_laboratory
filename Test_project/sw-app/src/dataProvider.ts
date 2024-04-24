import buildGraphQLProvider from "ra-data-graphql";
import { DataProvider, UpdateParams } from "react-admin";
import { client } from "./apolloClient";
import buildQuery from "./graphql/buildQuery";

export const onlyUpdateModifiedProvider = async (
  dataProviderPromise: Promise<DataProvider>
): Promise<DataProvider> => {
  const dataProvider = await dataProviderPromise;

  return {
    ...dataProvider,
    update: (originalResource: string, originalParams: UpdateParams) => {
      const method = "update";

      const { data, previousData } = originalParams;

      // TODO objects?
      const changedDataOnly = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== previousData[key]) {
          acc[key] = data[key];
        }
        return acc;
      }, {} as UpdateParams["data"]);

      return dataProvider[method](originalResource, {
        ...originalParams,
        data: changedDataOnly,
      });
    },
  };
};

export const buildDataProvider = (): Promise<DataProvider> =>
  onlyUpdateModifiedProvider(
    buildGraphQLProvider({
      buildQuery,
      introspection: {
        operationNames: {
          GET_LIST: (resource) =>
            `${
              resource.name.charAt(0).toLowerCase() + resource.name.slice(1)
            }s`,
          GET_ONE: (resource) =>
            `${resource.name.charAt(0).toLowerCase() + resource.name.slice(1)}`,
          DELETE_MANY: (resource) => `delete${resource.name}s`,
          GET_MANY_REFERENCE: (resource) =>
            `${
              resource.name.charAt(0).toLowerCase() + resource.name.slice(1)
            }s`,
          GET_MANY: (resource) =>
              `${
                  resource.name.charAt(0).toLowerCase() + resource.name.slice(1)
              }s`,
          CREATE: (resource) => `create${resource.name}`,
          UPDATE: (resource) => `update${resource.name}`,
          DELETE: (resource) => `delete${resource.name}`,
        },
      },
      client,
    })
  );
