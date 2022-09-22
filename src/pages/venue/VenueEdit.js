import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin';

const VenueEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="coordinates" />
            <DateInput source="remark" />
            <DateInput source="__v" />
            <TextInput source="id" />
        </SimpleForm>
    </Edit>
);

export default VenueEdit