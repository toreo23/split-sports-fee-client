import {
    ArrayInput,
    SimpleFormIterator,
    DateInput,
    DateTimeInput,
    required,
    Edit, 
    ReferenceInput, 
    SelectInput, 
    SimpleForm, 
    TextInput, 
    ReferenceArrayInput, 
    SelectArrayInput,
    TextArrayField,
    SingleFieldList,
    ChipField
} from 'react-admin';

import BallEventTextArrayField from '../../component/BallEventTextArrayField'

const BallEventEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceArrayInput source="earlyParticipant" reference="users">
                <SelectArrayInput optionText="displayName" />
            </ReferenceArrayInput>

            <ReferenceArrayInput source="lateParticipant" reference="users">
                <SelectArrayInput optionText="displayName" />
            </ReferenceArrayInput>

            <ReferenceArrayInput source="ballParticipant" reference="users">
                <SelectArrayInput optionText="displayName" />
            </ReferenceArrayInput>

            
            <DateTimeInput source="startTime" />
            <DateTimeInput source="endTime" />
            <TextInput source="id" />
            <TextInput source="remark" />

            <ReferenceInput source="venue" reference="venue" >
                <SelectInput optionText="name" validate={[required()]} />
            </ReferenceInput>

        </SimpleForm>
    </Edit>
);

export default BallEventEdit