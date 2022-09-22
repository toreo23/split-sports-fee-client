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


const UserCreate = () => (
    <Create>
        <SimpleForm>
            <DateTimeInput source="startTime" validate={[required()]} />
            <DateTimeInput source="endTime" validate={[required()]} />
            <DateTimeInput source="deadlineTime" validate={[required()]} />
            <NumberInput source="totalFee" validate={[required()]} />
            <NumberInput source="minNumPlayer" validate={[required()]} />
            <NumberInput source="ballSubsidy" validate={[required()]} />
            <NumberInput source="latePenalty" validate={[required()]} />
            <ReferenceInput source="venue" reference="venue" >
                <SelectInput optionText="name" 
                //validate={[required()]} 
                />
            </ReferenceInput>
            <SelectInput source="isBooked" choices={[
                { id: 'Y', name: 'Yes' },
                { id: 'N', name: 'No' },
            ]} />
        </SimpleForm>
    </Create>
);

export default UserCreate