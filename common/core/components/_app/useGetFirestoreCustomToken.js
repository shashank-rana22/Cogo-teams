import { setGeneralState } from '@cogoport/store/reducers/general';

const useGetFirestoreCustomToken = async () => {
	// eslint-disable-next-line global-require
	const admin = require('firebase-admin');

	const serviceAccount = {
		type           : 'service_account',
		project_id     : 'fir-cogoport',
		private_key_id : 'bfa8d7ed395e706326e650373123e8df2d73df5b',
		private_key    : process.env.FIREBASE_PRIVATE_KEY
			? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
			: undefined,
		client_email:
			'firebase-adminsdk-om6pz@fir-cogoport.iam.gserviceaccount.com',
		client_id                   : '101209778079293410230',
		auth_uri                    : 'https://accounts.google.com/o/oauth2/auth',
		token_uri                   : 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url : 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url        : process.env.FIREBASE_CLIENT_X509_CERT_URL,
	};
	const config = {
		credential  : admin.credential.cert(serviceAccount),
		databaseURL : 'https://fir-cogoport-default-rtdb.firebaseio.com',
	};
	const appExists = admin.apps.some((val) => val.name === 'secondary');

	const secondary_app = appExists
		? admin.app('secondary')
		: admin.initializeApp(config, 'secondary');

	const uid = process.env.FIRESTORE_AUTH_UID;
	const adminAuth = admin.auth(secondary_app);
	const firestoreCustomToken = 'tken';

	await adminAuth
		.createCustomToken(uid)
		.then((customToken) => {
			setGeneralState({ firestoreToken: customToken });
		})
		.catch((error) => {
			console.log(error);
		});
	return { firestoreCustomToken };
};

export default useGetFirestoreCustomToken;
