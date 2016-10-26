var PushNotification = require('react-native-push-notification');
import routes from '../routes/routes';
import { Alert } from 'react-native'

var handler = {
    navigator: null,
    productBuyed: function() {

    }
}

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        // console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {


        if ( handler['navigator'] ) {

            if (handler['navigator'].getCurrentRoutes().some(item => item.key === routes.checkout.key ) ) {
                handler['navigator'].popToRoute( routes.checkout );
            } else {
                handler['navigator'].push( routes.checkout );
            }
        };

        // if (handler[notification.tag]) handler[notification.tag]();

        /*switch( notification.tag ) {


            case 'checkout' :
                console.log(params);
                if ( !( params && params.navigator && params.navigator.push ) ) return;
                params.navigator.push(routes.checkout);

                // Alert.alert('show checkout view');
                // console.log(params.navigator);
                break;
            
            case 'productBuyed' :
                console.log('to product info');
                break;
        }*/

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


// var pushNotificObj = null;

const PushNotific = ( navigator ) => {
    if (navigator) {
        handler['navigator'] = navigator;    
    }

    // if ( params && params.navigator && params.navigator.push ) {
        // handler['checkout'] = function() {
            // params.navigator.push(routes.checkout);
        // }
    // }

    
    return PushNotification;
}


export default PushNotific;