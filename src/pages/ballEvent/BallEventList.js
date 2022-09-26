import { DateField, Datagrid, EmailField, List, TextField, UrlField, TextInput, CreateButton, EditButton,   ReferenceField, ArrayField, ChipField, SingleFieldList } from 'react-admin';

import { useMemo } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const userFilters = [
    // <TextInput label="email" source="email" alwaysOn />,
];

const BallEventList = () => {
    const { defaultDate } = useMemo(() => ({
        defaultDate: new Date(2015, 3, 13)
    }), [])
    return (
        <List filters={userFilters} actions={<CreateButton />}>
            <Datagrid rowClick="show">
                {/* <TextField source="id" /> */}
                <DateField showTime source="startTime"/>
                <DateField showTime source="endTime"/>
                <DateField showTime source="deadlineTime"/>
                <TextField source="totalFee" label="Total Fee" />
                <TextField source="latePenalty" label="Late Penalty" />
                <TextField source="ballSubsidy" label="Ball Subsidy" />
                
                <TextField source="venue.name" label="Venue" />
                <TextField source="isBooked" label="Venue Booked" />
                <TextField source="minNumPlayer" label="Minimum Player Required" />
                <TextField source="earlyParticipant.length" label="Early Participant" />
                <TextField source="lateParticipant.length" label="Late Participant" />
                <TextField source="ballParticipant.length" label="Bring Ball" />
                {/* <ArrayField source="earlyParticipant" label="Early Participant" >
                    <SingleFieldList>
                        <ChipField source="displayName" />
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="lateParticipant" label="Late Participant" >
                    <SingleFieldList>
                        <ChipField source="displayName" />
                    </SingleFieldList>
                </ArrayField>
                <ArrayField source="ballParticipant" label="Bring Ball" >
                    <SingleFieldList>
                        <ChipField source="displayName" />
                    </SingleFieldList>
                </ArrayField> */}
                <EditButton />
            </Datagrid>
        </List>
    )
};

export default BallEventList