import {
    Create,
    Datagrid,
    Edit,
    List, RadioButtonGroupInput,
    ReferenceArrayInput,
    ReferenceField, ReferenceInput,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput
} from "react-admin";

export const RaceList = () => (
    <List>
        <Datagrid rowClick="edit">
        <TextField source="name" />
            <ReferenceField source="origin_planet.id" reference="Planet" />
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

export const RaceCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
            <TextInput source="name" />
            <ReferenceInput source="origin_planet" reference="Planet" />
        </SimpleForm>
    </Create>
);