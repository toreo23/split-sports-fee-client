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


const MessageBoardCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput multiline source="message" />
        </SimpleForm>
    </Create>
);

export default MessageBoardCreate