export const firebaseConfig = {
	apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const FIRESTORE_USER_PATH = '/users';

const COGOONE_CONSTANTS = '/cogoone_constants';

export const FIRESTORE_PATH = {
	users_path        : FIRESTORE_USER_PATH,
	cogoone_constants : COGOONE_CONSTANTS,
};
