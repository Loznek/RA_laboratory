import React, {useEffect, useState} from 'react';
import buildGraphQLProvider, {buildQuery} from 'ra-data-graphql-simple';
import buildHasuraProvider from 'ra-data-hasura';
import {Admin, DataProvider, ListGuesser, Resource} from 'react-admin';
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {authProvider} from "./authProvider";
import {buildDataProvider} from "./dataProvider";
import {PlanetList, PlanetEdit, PlanetCreate} from "./planet/Planet";
import {JediList, JediEdit, JediCreate} from "./jedi/JediList";
import {RaceList, RaceEdit, RaceCreate} from "./Race/RaceList";
import {
    BrowserRouter,
    createBrowserRouter, Route,
    RouterProvider, Routes,
} from "react-router-dom";
import {UserList} from "./Users";
import {GalaxyAdmin} from "./GalaxyAdmin";
import {GalaxyFront} from "./GalaxyFront";
import {AboutPage} from "./aboutpage/About";
import {OpeningPage} from './fontpage/OpeningPage';
import Navbar from "./Navbar/Navbar";


export const App = () => (
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<OpeningPage/>} />
            <Route path="/admin/*" element={< GalaxyAdmin />} />
            <Route path="/about/*" element={<AboutPage />} />
        </Routes>
        </>
    );
