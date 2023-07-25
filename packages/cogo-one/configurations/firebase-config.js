export const firebaseConfig = {
	apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const PLATFORM_CHAT = '/customer_chat/platform_chat/rooms';

const WHATSAPP = '/customer_chat/whatsapp/rooms';

const TELEGRAM = '/customer_chat/telegram/rooms';

const ZALO = '/customer_chat/zalo/rooms';

const AGENT_DATA = '/users';

const COGOONE_CONSTANTS = '/cogoone_constants';

const EMAIL = '/customer_chat/email/rooms';

export const FIRESTORE_PATH = {
	whatsapp          : WHATSAPP,
	platform_chat     : PLATFORM_CHAT,
	telegram          : TELEGRAM,
	zalo              : ZALO,
	agent_data        : AGENT_DATA,
	cogoone_constants : COGOONE_CONSTANTS,
	email             : EMAIL,

};
