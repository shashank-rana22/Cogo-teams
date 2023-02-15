export const firebaseConfig = {
	apiKey            : process.env.FIREBASE_API_KEY,
	authDomain        : process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.FIREBASE_DATABASE_URL,
	projectId         : process.env.FIREBASE_PROJECT_ID,
	storageBucket     : process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.FIREBASE_SENDER_ID,
	appId             : process.env.FIREBASE_APP_ID,
};

export const firestoreChatbotPath = '/chanels_test/chatbot/rooms';
export const firestoreWhatsappPath = '/customer_chat/all/rooms';
