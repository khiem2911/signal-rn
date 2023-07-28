import { ListItem,Avatar } from '@rneui/themed';
import { auth } from '../../firebase';
import { Text } from 'react-native';

export default CustomListItem = () =>{
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes();
    return (
        <ListItem  >
            <Avatar rounded source={{uri:auth.currentUser.photoURL}}/>
            <ListItem.Content >
                <ListItem.Title  style={{fontSize:20}}>CHAT CHAT</ListItem.Title>
                <ListItem.Subtitle>Haloo</ListItem.Subtitle>
            </ListItem.Content>
          <Text>{hours}:{min}</Text>
        </ListItem>
    )
}