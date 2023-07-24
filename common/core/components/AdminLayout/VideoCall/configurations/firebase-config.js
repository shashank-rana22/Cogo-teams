export const FIREBASE_CONFIG = {
	apiKey            : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain        : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL       : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId         : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const FIRESTORE_VIDEO_CALLS_PATH = 'video_calls';
const FIRESTORE_WEBRTC_TOKEN_PATH = 'webrtc_token';

export const FIRESTORE_PATH = {
	video_calls  : FIRESTORE_VIDEO_CALLS_PATH,
	webrtc_token : FIRESTORE_WEBRTC_TOKEN_PATH,
};
