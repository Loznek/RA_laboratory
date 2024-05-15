import {
    ChipField,
    Create,
    Datagrid, DateField,
    Edit,
    List, RadioButtonGroupInput,
    ReferenceArrayInput,
    ReferenceField, ReferenceInput,
    ReferenceManyField, RichTextField, Show,
    SimpleForm, SimpleShowLayout, SingleFieldList,
    TextField,
    TextInput
} from "react-admin";
import React from "react";

export const RaceList = () => (
    <List sx={{
        ml: 10,
        mr: 40
    }}>
        <Datagrid rowClick="edit" >
        <TextField source="name" />
            <ReferenceField source="origin_planet.id" reference="Planet" label="Planet Name"/>
            <ReferenceManyField reference="Planet" target="residents" label="Can be found on">
                <SingleFieldList sx={{
                    width: {
                        xs: 200, // theme.breakpoints.up('xs')
                        sm: 200, // theme.breakpoints.up('sm')
                        md: 300, // theme.breakpoints.up('md')
                        lg: 300, // theme.breakpoints.up('lg')
                        xl: 300, // theme.breakpoints.up('xl')
                    },
                }}>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>


        </Datagrid>
    </List>
);


export const RaceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceInput source="origin_planet.id" reference="Planet" />
        </SimpleForm>
    </Edit>
);

export const RaceShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="published_at" />
        </SimpleShowLayout>
    </Show>
)



export const RaceCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceInput source="origin_planet" reference="Planet" />
        </SimpleForm>
    </Create>
);