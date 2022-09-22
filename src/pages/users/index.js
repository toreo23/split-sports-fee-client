import UserIcon from '@mui/icons-material/LibraryBooks';
import UserList from './UserList';
import UserCreate from './UserCreate';

export default [{
    name:'users', 
    options: {
        label: 'Users',
        roles: {
            list: ['Admin'],
            create: ['Admin'],
            edit: ['Admin'],
            show: ['Admin']
        }
    },
    list: UserList,
    icon: UserIcon,
    create:UserCreate
}];
