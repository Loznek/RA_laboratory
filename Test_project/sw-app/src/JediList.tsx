import {
    ChipField, Create,
    Datagrid, Edit,
    List, NumberInput, RadioButtonGroupInput,
    ReferenceArrayField,
    ReferenceField, ReferenceInput,
    ReferenceManyField, SelectArrayInput, SimpleForm,
    SingleFieldList,
    TextField, TextInput
} from "react-admin";

export const JediList = () => (
    <List>
        <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="lightSaber" />
        <TextField source="birthYear" />
            <ReferenceField reference="Planet" source="birthPlanet.id" label="Birth Planet"  />
            <ReferenceField reference="Jedi" source="master.id"  />
            <ReferenceManyField reference="Jedi" target="master" label="Padawans">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            </Datagrid >
    </List>
);



export const JediEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
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
            <TextInput source="id" InputProps={{ disabled: true }} />
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