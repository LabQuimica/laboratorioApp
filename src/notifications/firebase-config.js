// firebase-config.js
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

class NotificationService {
  
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Permisos de notificación concedidos');
      return true;
    }
    return false;
  }

  async getToken() {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Aquí deberías enviar el token a tu servidor para guardarlo
      // asociado al usuario actual
      await this.saveTokenToServer(token);
      return token;
    } catch (error) {
      console.error('Error obteniendo token:', error);
    }
  }

  async saveTokenToServer(token) {
    // Reemplaza con tu endpoint
    try {
      await fetch('http://tu-servidor.com/api/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tu_jwt_token}` // Tu token de autenticación
        },
        body: JSON.stringify({
          fcm_token: token,
          usuario_id: usuario_actual_id // ID del usuario logueado
        })
      });
    } catch (error) {
      console.error('Error guardando token:', error);
    }
  }

  setupNotificationListeners() {
    // Notificación recibida cuando la app está en primer plano
    messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    // Notificación presionada cuando la app está en segundo plano
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notificación presionada (background):', remoteMessage);
      // Navegar a la pantalla correspondiente
      this.handleNotificationNavigation(remoteMessage.data);
    });

    // Verificar si la app se abrió desde una notificación
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App abierta desde notificación:', remoteMessage);
          this.handleNotificationNavigation(remoteMessage.data);
        }
      });
  }

  handleNotificationNavigation(data) {
    // Lógica para navegar según el tipo de notificación
    if (data?.tipo === 'nueva_practica_asignada') {
      // Navegar a la pantalla de prácticas
      // navigation.navigate('PracticasScreen', { practica_id: data.practica_id });
    }
  }
}

export default new NotificationService();