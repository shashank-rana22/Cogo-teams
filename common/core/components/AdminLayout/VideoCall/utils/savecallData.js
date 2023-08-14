import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const saveCallData = async ({ data = {}, callingRoomId = '', callBackFunc = () => {}, firestore = {} }) => {
	const videoCallRoomCollection = doc(
		firestore,
		`${FIRESTORE_PATH.video_calls}/${callingRoomId}`,
	);

	try {
		const dataToSave = {
			...(data || {}),
			updated_at : Date.now(),
			created_at : Date.now(),
		};
		setDoc(videoCallRoomCollection, dataToSave);
		callBackFunc(callingRoomId);
	} catch (error) {
		console.error(error);
	}
};
