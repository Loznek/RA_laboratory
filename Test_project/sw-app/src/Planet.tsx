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
    SelectInput, SelectArrayInput
} from "react-admin";

export const PlanetList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="surface" />
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

/*

  <ReferenceArrayInput source="natives" reference="Race" >
            </ReferenceArrayInput>
 */
export const PlanetEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" InputProps={{ disabled: true }} />
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