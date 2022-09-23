import UserIcon from '@mui/icons-material/LibraryBooks';
import VenueList from './VenueList';
import VenueCreate from './VenueCreate';
import VenueEdit from './VenueEdit';
import VenueShow from './VenueShow'

export default [{
    name:'venue', 
     options: {
        label: 'Venue',
        roles: {
            list: ['Admin', 'BallEvent_Player'],
            create: ['Admin'],
            edit: ['Admin'],
            show: ['Admin', 'BallEvent_Player']
        }
    },
    list: VenueList,
    icon: UserIcon,
    create:VenueCreate,
    edit: VenueEdit,
    show: VenueShow
}];

