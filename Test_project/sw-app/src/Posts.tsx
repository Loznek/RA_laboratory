import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    ReferenceArrayField,
    ChipField,
    ReferenceManyField, SingleFieldList
} from "react-admin";

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="author.id" reference="User" />
            <ReferenceManyField reference="Tag" target="posts" label="Tags">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            <TextField source="id" />
            <TextField source="author.id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);