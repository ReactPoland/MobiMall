var PushNotification = require('react-native-push-notification');
import routes from '../routes/routes';
import {
    Alert,
} from 'react-native';

var pushNotificObj = null;

const PushNotific = ( params ) => {
    
    if (pushNotificObj) return pushNotificObj;

    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            // console.log( 'TOKEN:', token );
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {

        	switch( notification.tag ) {

        		case 'checkout' :
                    Alert.alert('show checkout view');
                    // console.log(params.navigator);
                    break;
                
                case 'productBuyed' :
                    console.log('to product info');
        			break;
        	}

        	// console.log( notification.tag );
            // console.log( 'NOTIFICATION:', notification );
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
        // senderID: "YOUR GCM SENDER ID",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });

    pushNotificObj = PushNotification;
    return pushNotificObj;
}


export default PushNotific;