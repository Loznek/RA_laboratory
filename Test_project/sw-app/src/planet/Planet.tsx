import {
    List,
    Datagrid,
    TextField,
    EmailField,
    ReferenceField,
    ReferenceManyField,
    ChipField,
    SingleFieldList,
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    RadioButtonGroupInput,
    ReferenceArrayInput,
    Create,
    SelectInput,
    SelectArrayInput,
    SearchInput,
    useTranslate,
    FilterLiveSearch,
    FilterList,
    FilterListItem,
    SavedQueriesList,
    SimpleShowLayout,
    RichTextField,
    DateField,
    Show,
    TabbedShowLayout,
    useRecordContext,
    SimpleList,
    TopToolbar, CreateButton, FilterButton
} from "react-admin";
import { Chip } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import { Card, CardContent } from '@mui/material';
import NameInput from "../NameInput";
import React from "react";
// @ts-ignore


const PlanetTitle = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>Planet "{record.name}"</span>;
};

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};

const planetFilters = [
    <NameInput label="Name" source='name' />,
];

const PlanetListActions = () => (
    <TopToolbar>
        <CreateButton />
        <FilterButton />
    </TopToolbar>
);

export const PlanetFilterSidebar = () => (
    <Card sx={{ order: -1, mr: 2, mt: 5, width: 200 }}>
        <CardContent>
            <FilterList label="Surface" icon={<CategoryIcon />}>
                <FilterListItem label="Desert" value={{ surface: {equals: 'desert'} }} />
                <FilterListItem label="Swampy" value={{ surface: {equals: 'swampy'}  }} />
                <FilterListItem label="Aqueous" value={{ surface: {equals: 'aqueous'}  }} />
                <FilterListItem label="Gas" value={{ surface: {equals: 'gas'}  }} />
            </FilterList>
        </CardContent>
    </Card>
);


const ColoredSurfaceField = (props:any) => {
    const record = useRecordContext();
    return (
        <TextField sx={{ color: record[props.source] == 'desert' ?
                        '#C2B280' : record[props.source] == 'gas' ?
                        '#8c8c8c' : record[props.source] == 'aqueous' ?
                        '#74ccf4' : '#a6b96f',
                        fontWeight: "fontWeightBold",
                        ":hover": {
                        color:  '#000000',}
                        }}
                   {...props}  />
    );
};

export const PlanetList = () => {
    return(
        <List aside={<PlanetFilterSidebar /> }
              filters={planetFilters}
              sx={{mr: '5%'}}
              actions={<PlanetListActions />}>
            <Datagrid rowClick="show" >
                <TextField source="name" />
                <ColoredSurfaceField source="surface" />
                <ReferenceManyField reference="Race" target="origin_planet" label="Natives">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceManyField>
                <ReferenceManyField reference="Race" target="occupied_planets" label="Residents">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceManyField>
            </Datagrid>
        </List>
    );
}


export const PlanetEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput source="natives" reference="Race" >
                <SelectArrayInput source="Race" />
            </ReferenceInput>
            <RadioButtonGroupInput source="surface" choices={[
                { id: 'desert', name: 'Desert' },
                { id: 'swampy', name: 'Swampy' },
                { id: 'gas', name: 'Gas' },
                { id: 'aqueous', name: 'Aqueous' },
            ]} />
        </SimpleForm>
    </Edit>
);

export const PlanetCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceArrayInput source="natives" reference="Race" />

            <RadioButtonGroupInput source="surface" choices={[
                { id: 'desert', name: 'Desert' },
                { id: 'swampy', name: 'Swampy' },
                { id: 'gas', name: 'Gas' },
                { id: 'aqueous', name: 'Aqueous' },
            ]} />
        </SimpleForm>
    </Create>
);

export const PlanetShow = () => (
    <Show title={<PlanetTitle />}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Basics">
                <TextField source="name" />
                <ColoredSurfaceField source="surface" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Residents">
                <ReferenceManyField reference="Race" target="occupied_planets" >

                        <SimpleList
                            sx={{
                                ml:'5%',
                                mr:'20%',
                                border: 1,
                                borderRadius: '5%',
                                backgroundColor: '#464646',
                                width: {
                                    xs: 200, // theme.breakpoints.up('xs')
                                    md: 300, // theme.breakpoints.up('md')
                                },
                            }}
                            primaryText={record => record.name}
                            rowSx={record => ({ backgroundColor: '#464646' })}
                        >
                            <SingleFieldList>
                                <ChipField  sx={{
                                    border: 1,
                                    borderRadius: '10%',
                                    fontSize:18
                                }} source="name" />
                            </SingleFieldList>
                        </SimpleList>

                </ReferenceManyField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Jedi From this planet">
                <ReferenceManyField reference="Jedi" target="birthPlanet" >
                    <SingleFieldList
                        sx={{
                            ml:'5%',
                            mr:'50%',
                        }}
                    >
                        <ChipField  sx={{
                            border: 1,
                            borderRadius: '10%',
                            fontSize:18
                        }} source="name" />
                    </SingleFieldList>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>

)