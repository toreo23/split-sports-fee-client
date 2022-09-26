import {useEffect} from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    RichTextField,
    TabbedShowLayout,
    Tab,
    Datagrid, 
    EmailField, 
    List, 
    UrlField, 
    TextInput, 
    CreateButton, 
    EditButton,   
    ReferenceField, 
    ArrayField, 
    ChipField, 
    SingleFieldList,
    useRecordContext,
    useListContext,
    TopToolbar,
    useDataProvider,
    Button,
    useNotify,
    useRedirect,
    useRefresh,
    ShowBase,
    ReferenceManyField, 
    ReferenceArrayField,
    FunctionField,
    Pagination 
} from 'react-admin';
import { useMutation } from 'react-query';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import {Typography, Chip, Grid } from '@mui/material'

import Calulator from "../../component/Calculator";

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const VenueMap = ({lat, lon}) => {
   
    return <MapContainer  center={[lat,lon]} zoom={15} scrollWheelZoom={false} fullWidth>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[lat,lon]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>;
};

const VenueGoogleMap = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2534.628972645568!2d114.10046674371502!3d22.370964865266775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd57cac6391c53cd6!2z6I2D54Gj6KW_57SE6auU6IKy6aSo!5e0!3m2!1szh-TW!2shk!4v1663123540127!5m2!1szh-TW!2shk" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>;
};

const CountLate = ()=>{
    const record = useRecordContext();
    if (!record) return null;
    return <Typography>Late Count:{record.lateParticipant.length}</Typography>
};

const BallEventShowActions = () => {

    const record = useRecordContext();
    if (!record) return null;
    return(<TopToolbar>
            {/* <EditButton /> */}
            {/* Add your custom actions */}
            <RegisterBallEventButton/>
            {/* <Button color="primary" onClick={() => { console.log('custom actions record', record)}}>Custom Action</Button> */}
        </TopToolbar>)
        
}

const EventFeeStat = () =>{
    const record = useRecordContext();
    if (!record) return null;
    return <Calulator></Calulator>

}

const RegisterBallEventButton = ({ id }) => {
    const localStorageUserId = JSON.parse(window.localStorage.getItem('auth')).user.id;

    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const { mutate, isLoading } = useMutation(
        ['registerBallEvent', id],
        () => dataProvider.registerBallEvent(record.id)
            .then(() => {
                notify(`Successfully Register`, { type: 'success' })
                refresh()
            })
            .catch((e) => {
                notify(`Error in Register ${e}`, { type: 'warning' })
                refresh()
            })

    );
    if (!record) return null;
    if (record.lateParticipant.some(item => item === localStorageUserId) || record.lateParticipant.some(item => item === localStorageUserId)) {
        console.log('includes record', record)
        return <Button  disabled={true} >Registered</Button>
    } else {
        console.log('else record', record)
        return <Button  onClick={() => mutate()} disabled={isLoading}>Register</Button> ;
    }
};

const RegisterBallEventBringBallButton = ({ id }) => {
    const localStorageUserId = JSON.parse(window.localStorage.getItem('auth')).user.id;

    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const { mutate, isLoading } = useMutation(
        ['registerBallEvent', id],
        () => dataProvider.registerBallEventBringBall(record.id)
            .then(() => {
                notify(`Successfully Declare Bring Ball`, { type: 'success' })
                refresh()
            })
            .catch((e) => {
                notify(`Error on Declare Bring Ball:  ${e}`, { type: 'warning' })
                refresh()
            })

    );
    if (!record) return null;
    if (record.lateParticipant.some(item => item === localStorageUserId) || record.lateParticipant.some(item => item === localStorageUserId)) {
        console.log('includes record', record)
        return <Button  disabled={true} >Declared Bring Ball </Button>
    } else {
        console.log('else record', record)
        return <Button  onClick={() => mutate()} disabled={isLoading}>Bring Ball</Button> ;
    }
};

const BallEventShow = props =>
{ 
    useEffect(()=>{
    }, [])
    
    return (
    <Show>
        <Grid container>
            <Grid item xs={12} md={4}>
            <SimpleShowLayout>
            <TextField source="id" />
            <DateField showTime source="startTime" label="Start Time" />
            <DateField showTime source="endTime" label="End Time"/>
            <DateField showTime source="deadlineTime" label="Deadline Time" />
            <TextField source="venue.name" label="Venue" />
            
        </SimpleShowLayout>
            </Grid>
            <Grid item xs={12} md={4}>
            <SimpleShowLayout>
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
            
            <ReferenceArrayField source="earlyParticipant" label="Early Participant" reference="users"    >
                <SingleFieldList>
                    <ChipField source="displayName" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField source="lateParticipant" label="Late Participant" reference="users"    >
                <SingleFieldList>
                    <ChipField source="displayName" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField source="ballParticipant" label="Ball Participant" reference="users"    >
                <SingleFieldList>
                    <ChipField source="displayName" />
                </SingleFieldList>
            </ReferenceArrayField>



        
        </SimpleShowLayout>
            </Grid>
            <Grid item container alignItems="center"
  justifyContent="center" xs={12} md={4}>
    
            <RegisterBallEventButton/>  
            <RegisterBallEventBringBallButton/>  
            </Grid>

            
        </Grid>
       
        <TabbedShowLayout>
            <Tab label="Venue">
                <CountLate></CountLate>
                <ReferenceField label="Author" source="venue" reference="venue">
                <FunctionField render={record => record && <VenueMap lat={record.coordinates[0]} lon={record.coordinates[1]}></VenueMap>} />
            </ReferenceField>
                {/* <VenueGoogleMap/> */}
                
            <TextField source="venue.name" />
            <TextField source="venue.coordinates" />
            </Tab>

            <Tab label="History">
            <ReferenceManyField sort={{ field: 'createdAt', order: 'DESC' }} perPage={5} pagination={<Pagination />}  reference="registerLog" target="ballEventId">

                <Datagrid>
                <TextField label="ballEventId" source="ballEventId" />
                <TextField label="Player" source="userId.displayName" />
                <TextField label="Action" source="action" />
                <TextField label="Create Time" source="createdAt" />
                </Datagrid>
            </ReferenceManyField>
            </Tab>
            <Tab label="Calculator">

            <EventFeeStat></EventFeeStat>
            </Tab>
        </TabbedShowLayout>
    </Show>
)};

export default BallEventShow