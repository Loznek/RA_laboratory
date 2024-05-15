import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Admin, AppBar, DataProvider, defaultTheme, Layout, Resource} from "react-admin";
import {buildDataProvider} from "./dataProvider";
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';
import yellow from '@mui/material/colors/yellow';
import PlanetIcon from '@mui/icons-material/TravelExplore';
import RaceIcon from '@mui/icons-material/Attribution';
import JediIcon from '@mui/icons-material/BackHand';
import grey from '@mui/material/colors/grey';
import {authProvider} from "./authProvider";
import {JediCreate, JediEdit, JediList, JediShow} from "./jedi/JediList";
import {PlanetCreate, PlanetEdit, PlanetList, PlanetShow} from "./planet/Planet";
import {RaceCreate, RaceEdit, RaceList, RaceShow} from "./Race/RaceList";
import {darkTheme} from "./themes/darkTheme";

export const GalaxyAdmin = () => {

    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {

        buildDataProvider().then((graphQlDataProvider) =>
            setDataProvider(() => graphQlDataProvider)
        );
    }, []);

    return (
        dataProvider && (
                <Admin  layout={SwLayout} theme={darkTheme} basename="/admin" requireAuth authProvider={authProvider} dataProvider={dataProvider}>
                    <Resource icon={JediIcon} name="Jedi" list={JediList} edit={JediEdit} show={JediShow}  create={JediCreate} recordRepresentation={(record: any) => `${record.name}`} />
                    <Resource icon={PlanetIcon} name="Planet" list={PlanetList} edit={PlanetEdit} show={PlanetShow} create={PlanetCreate} recordRepresentation={(record: any) => `${record.name}`}/>
                    <Resource icon={RaceIcon} name="Race" list={RaceList}  edit={RaceEdit} create={RaceCreate} recordRepresentation={(record: any) => `${record.name}`}/>
                </Admin>
        )
    );
};

export const SwAppBar = () => <AppBar sx={{ background:'#000000' }} color="primary" position="relative" />;

// @ts-ignore
export const SwLayout = props => <Layout sx={{ '& .RaLayout-appFrame': { marginTop: 0 } }} {...props} appBar={SwAppBar} />;

