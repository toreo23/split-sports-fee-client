import UserIcon from '@mui/icons-material/LibraryBooks';
import BallEventList from './BallEventList';
import BallEventCreate from './BallEventCreate';
import BallEventEdit from './BallEventEdit';
import BallEventShow from './BallEventShow'

export default [{
    name: 'ballEvent',
    options: {
        label: 'Ball Event',
        roles: {
            list: ['Admin', 'BallEvent_Player'],
            create: ['Admin'],
            edit: ['Admin'],
            show: ['Admin', 'BallEvent_Player']
        }
    },
    list: BallEventList,
    icon: UserIcon,
    create: BallEventCreate,
    edit: BallEventEdit,
    show: BallEventShow,

}];