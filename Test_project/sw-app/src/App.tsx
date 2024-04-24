import React, {useEffect, useState} from 'react';
import buildGraphQLProvider, {buildQuery} from 'ra-data-graphql-simple';
import buildHasuraProvider from 'ra-data-hasura';
import {Admin, DataProvider, ListGuesser, Resource} from 'react-admin';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {PostList} from "./Posts";
import {authProvider} from "./authProvider";
import {buildDataProvider} from "./dataProvider";
import {PlanetList, PlanetEdit, PlanetCreate} from "./Planet";
import {JediList, JediEdit, JediCreate} from "./JediList";
import {RaceList, RaceEdit, RaceCreate} from "./RaceList";
import {UserList} from "./Users";

export const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {

        buildDataProvider().then((graphQlDataProvider) =>
            setDataProvider(() => graphQlDataProvider)
        );
    }, []);


    // @ts-ignore
    return (
        dataProvider && (
            <Admin
                requireAuth
                authProvider={authProvider}
                dataProvider={dataProvider}
            >

                <Resource name="Jedi" list={JediList} edit={JediEdit}  create={JediCreate} recordRepresentation={(record) => `${record.name}`}/>
                <Resource name="Planet" list={PlanetList} edit={PlanetEdit}  create={PlanetCreate} recordRepresentation={(record) => `${record.name}`}/>
                <Resource name="Race" list={RaceList}  edit={RaceEdit}  create={RaceCreate} recordRepresentation={(record) => `${record.name}`}/>


            </Admin>
        )
    );
};

/*
export const App = () => {


  <Resource name="Tag"  recordRepresentation={(record) => `${record.name}`} />
                <Resource name="Post" list={PostList} />
                <Resource name="User" list={UserList}    recordRepresentation={(record) => `${record.name} ${record.email}`} />



    // @ts-ignore
    const myBuildQuery = introspection => (fetchType, resource, params) => {
        const builtQuery = buildQuery(introspection)(fetchType, resource, params);

        if (resource === 'Post' && fetchType === 'GET_LIST') {
            // @ts-ignore
            return {
                // Use the default query variables and parseResponse
                ...builtQuery,
                parseResponse: response => response.data,
                // Override the query
                query: gql`
                   query Posts {
                        data: posts {
                            author {
                                name
                                email
                               },
                                title
                            }
                        }`,
            };
        }

        return builtQuery;
    };


    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);

//
    const myClient = new ApolloClient({
        uri: 'http://localhost:3000/api/graphql',
        cache: new InMemoryCache()
    });

    useEffect(() => {
        buildGraphQLProvider({client: myClient, buildQuery: myBuildQuery})
            .then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);



useEffect(() => {
    const buildDataProvider = async () => {
        const dataProvider = await buildHasuraProvider({
            clientOptions: { uri: 'https://graphqlzero.almansi.me/api' },
        });
        setDataProvider(() => dataProvider);
    };
    buildDataProvider();
}, []);

    if (!dataProvider) {
        return <h1> Loading </h1>;
    }
    dataProvider.getList('Post', {
        pagination: {page: 1, perPage: 5},
        sort: {field: 'title', order: 'ASC'},
        filter: {author_id: 12},
    })
        .then(response => console.log(response));
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="Post" list={ListGuesser}/>
        </Admin>
    );


}
*/