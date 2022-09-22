import { Datagrid, DateField, List, RichTextField , ReferenceField, TextField } from 'react-admin';

const MessageBoardList = () => (
    <List sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid  rowClick="edit">
            <TextField source="userId.displayName" />
            <TextField source="message" />
            <DateField showTime source="createdAt" />
            
        </Datagrid>
    </List>
);

export default MessageBoardList