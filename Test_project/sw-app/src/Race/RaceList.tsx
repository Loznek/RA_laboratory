import {
    ChipField,
    Create, CreateButton,
    Datagrid, DateField,
    Edit,
    List, RadioButtonGroupInput,
    ReferenceArrayInput,
    ReferenceField, ReferenceInput,
    ReferenceManyField, RichTextField, Show,
    SimpleForm, SimpleShowLayout, SingleFieldList,
    TextField,
    TextInput, TopToolbar, useRecordContext
} from "react-admin";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from "react";

const RaceTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Race "{record.name}"</span>;
};

const RaceListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const RaceList = () => (
    <List sx={{ml: 10, mr: 40}}
          actions={<RaceListActions />}>
        <Datagrid  rowClick="expand"
                  expand={<RaceShow />}>
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



const RaceShow = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <Card sx={{ width: 600, margin: 'auto' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>
                            Race Details
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="right">
                            {record.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Box height={20}>&nbsp;</Box>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom align="center">
                            Jedi
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                            <ReferenceManyField reference="Jedi" target="race" >
                                <SingleFieldList >
                                    <ChipField  sx={{
                                        border: 1,
                                        borderRadius: '10%',
                                        fontSize:18
                                    }} source="name" />
                                </SingleFieldList>
                            </ReferenceManyField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};




export const RaceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceInput source="origin_planet.id" reference="Planet" />
        </SimpleForm>
    </Edit>
);




/*
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
*/


export const RaceCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceInput source="origin_planet" reference="Planet" />
        </SimpleForm>
    </Create>
);