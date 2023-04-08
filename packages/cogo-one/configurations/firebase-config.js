export const firebaseConfig = {
	apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firestoreChatbotPath = '/customer_chat/platform_chat/rooms';

const firestoreWhatsappPath = '/customer_chat/whatsapp/rooms';

const firestoreTelegramPath = '/customer_chat/telegram/rooms';

export const FIRESTORE_PATH = {
	whatsapp      : firestoreWhatsappPath,
	platform_chat : firestoreChatbotPath,
	telegram      : firestoreTelegramPath,
};
