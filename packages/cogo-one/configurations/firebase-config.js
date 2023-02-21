export const firebaseConfig = {
	apiKey            : 'AIzaSyAtpMPDzLTdMqTmqn1LR53btB6swuSxaeE',
	authDomain        : 'cogo-bot-messages.firebaseapp.com',
	databaseURL       : 'https://cogo-bot-messages-default-rtdb.firebaseio.com',
	projectId         : 'cogo-bot-messages',
	storageBucket     : 'cogo-bot-messages.appspot.com',
	messagingSenderId : '654045685170',
	appId             : '1:654045685170:web:dfb6cbf1fae8f1618970ab',
	measurementId     : 'G-Y0CLFL5KDZ',
};

const firestoreChatbotPath = '/customer_chat/platform_chat/rooms';

const firestoreWhatsappPath = '/customer_chat/whatsapp/rooms';

export const FIRESTORE_PATH = {
	whatsapp      : firestoreWhatsappPath,
	platform_chat : firestoreChatbotPath,
};
