import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    DateTimeInput,
    required,
    ReferenceInput,
    SelectInput
} from 'react-admin';


const VenueCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="coordinates" />
            <TextInput source="remark" />
            <TextInput source="id" />
        </SimpleForm>
    </Create>
);

export default VenueCreate