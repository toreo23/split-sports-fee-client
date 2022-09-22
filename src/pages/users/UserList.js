import { Datagrid, EmailField, List, TextField, UrlField, TextInput, CreateButton, ReferenceField } from 'react-admin';

import { useMemo } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const userFilters = [
    <TextInput label="email" source="email" alwaysOn />,
];

const UserList = () => {
    const { defaultDate } = useMemo(() => ({
        defaultDate: new Date(2015, 3, 13)
    }), [])
    return (
        <List filters={userFilters} actions={<CreateButton />}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="displayName" label="Name" />
                <TextField source="testingInfo.testingName" label="testingName" />
                <TextField source="testingInfo._id" label="testingInfo.id" />
                <EmailField source="email" />
            </Datagrid>
        </List>
    )
};

export default UserList