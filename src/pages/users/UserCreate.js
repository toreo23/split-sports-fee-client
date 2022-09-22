import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';


const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="email" validate={[required()]} />
            <TextInput source="displayName" validate={[required()]}/>
        </SimpleForm>
    </Create>
);

export default UserCreate