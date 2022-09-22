import UserIcon from '@mui/icons-material/LibraryBooks';
import MessageBoardList from './MessageBoardList';
import MessageBoardCreate from './MessageBoardCreate';
import MessageBoardEdit from './MessageBoardEdit';
import MessageBoardShow from './MessageBoardShow'

export default [{
    name:'messageBoard', 
     options: {
        label: 'MessageBoard',
        roles: {
            list: ['Admin', 'BallEvent_Player'],
            create: ['Admin', 'BallEvent_Player'],
            edit: ['Admin'],
            show: ['Admin', 'BallEvent_Player']
        }
    },
    list: MessageBoardList,
    icon: UserIcon,
    create:MessageBoardCreate,
    edit: MessageBoardEdit,
    show: MessageBoardShow
}];

