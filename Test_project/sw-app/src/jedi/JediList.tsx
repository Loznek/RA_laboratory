import {
    ChipField, Create,
    Datagrid, DateField, Edit,
    List, NumberInput, RadioButtonGroupInput,
    ReferenceArrayField,
    ReferenceField, ReferenceInput,
    ReferenceManyField, RichTextField, SelectArrayInput, Show, SimpleForm, TabbedShowLayout, SimpleShowLayout,
    SingleFieldList,
    TextField, TextInput, useRecordContext, FilterList, FilterListItem, ImageField
} from "react-admin";

import PICTURES from '../Pictures/PICTURES'
import React from "react";
import Typography from '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {Card, CardContent} from "@mui/material";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const JediList = () => (
    <List sx={{
    mr: 30, ml:10
    }}>
        <Datagrid rowClick="show" sx={{
            '& .RaDatagrid-rowOdd': {
                backgroundColor: '#222222',
            },
        }}>
        <TextField source="name" />
        <TextField source="lightSaber" />
        <TextField source="birthYear" />
            <ReferenceField reference="Jedi" source="master.id"  label="Master" />
            <ReferenceManyField reference="Jedi" target="master" label="Padawans" >
                <SingleFieldList  sx={{
                    width: {
                        xs: 200, // theme.breakpoints.up('xs')
                        md: 300, // theme.breakpoints.up('md')
                    },
                }}>
                    <ChipField sx={{
                        background: `#7fb0af`,
                        color: 'rgba(243,219,98,0.87)',
                        p: 1,
                        mb: 1,
                        mt: 2,
                    }} source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            </Datagrid >
    </List>
);

const JediTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Jedi "{record.name}"</span>;
};


export const JediShow = () => (
    <Show aside={<Aside/>}  title={<JediTitle />}>
        <SimpleShowLayout sx={{
            fontSize: 22,
            lineHeight:1,
            mb:5,
            "& .RaSimpleShowLayout-row": {
                mb:3,
            }
        }}>
            <TextField sx={{
                fontSize: 28,
            }} source="name" />
            <RichTextField source="birthYear" />
            <ReferenceField reference="Planet" source="birthPlanet.id" label="Birth Planet"  />
            <ReferenceField reference="Jedi" source="master.id"  label="Master" />
            <ReferenceManyField reference="Jedi" target="master" label="Padawans">
                <SingleFieldList>
                    <ChipField sx={{
                        color: 'rgba(243,219,98,0.87)',
                        borderRadius: "10%",
                        p: 1,
                        mb: 1,
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center', // Center chip content
                        justifyContent: 'space-between', // Distribute content evenly
                    }} source="name" />
                </SingleFieldList>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)

const Aside = () => {
    const record = useRecordContext();
    let saberPicture = "";
    switch (record.lightSaber){
        case 'green':{
            saberPicture=PICTURES.green;
            break;
        }
        case 'blue':{
            saberPicture=PICTURES.blue;
            break;
        }
        default:{
            saberPicture=PICTURES.purple;
            break;
        }
    }
    return (
        <Card sx={{ order: -1, mr: 2, mt: 0, width: 200 }}>
            <CardContent >
                <div>
                    <center><img  height={400} src={saberPicture} title="saber" /></center>
                </div>
            </CardContent>
        </Card>
    );
};

export const JediEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="master.id" reference="Jedi" />
            <ReferenceInput source="padawans" reference="Jedi" >
                <SelectArrayInput source="Jedi" />
            </ReferenceInput>
            <RadioButtonGroupInput source="lightSaber" choices={[
                { id: 'blue', name: 'Blue' },
                { id: 'green', name: 'Green' },
                { id: 'purple', name: 'Purple' },
            ]} />
            <NumberInput source="birthYear" />
            <ReferenceInput source="birthPlanet.id" reference="Planet" />
            <ReferenceInput source="race.id" reference="Race"/>
        </SimpleForm>
    </Edit>
);

export const JediCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="master.id" reference="Jedi" />
            <ReferenceInput source="padawans" reference="Jedi" >
                <SelectArrayInput source="Jedi" />
            </ReferenceInput>
            <RadioButtonGroupInput source="lightSaber" choices={[
                { id: 'blue', name: 'Blue' },
                { id: 'green', name: 'Green' },
                { id: 'purple', name: 'Purple' },
            ]} />
            <NumberInput source="birthYear" />
            <ReferenceInput source="birthPlanet.id" reference="Planet" />
            <ReferenceInput source="race.id" reference="Race"/>
        </SimpleForm>
    </Create>
);