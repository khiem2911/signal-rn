import { showMessage } from "react-native-flash-message";


export default showNoitce = (message,type) =>{
    return (
        showMessage({
            message:message,
            type:type
        })
    )
}