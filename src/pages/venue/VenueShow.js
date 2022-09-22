import { DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

const VenueShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="coordinates" />
            <DateField source="remark" />
            <DateField source="__v" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);

export default VenueShow