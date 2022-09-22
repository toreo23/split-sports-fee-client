import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';

const VenueList = () => (
    <List>
        <Datagrid rowClick="edit">
        <TextField source="id" />
            <TextField source="name" />
            <TextField source="coordinates" />
            <TextField source="remark" />
            <DateField source="__v" />
            
        </Datagrid>
    </List>
);

export default VenueList