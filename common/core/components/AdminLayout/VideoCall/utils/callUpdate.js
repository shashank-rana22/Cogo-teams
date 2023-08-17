import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const callUpdate = ({ data = {}, firestore = {}, callingRoomId = '' }) => {
	if (!callingRoomId) {
		return;
	}

	try {
		const videCallRoomDoc = doc(
			firestore,
			FIRESTORE_PATH.video_calls,
			callingRoomId,
		);

		setDoc(videCallRoomDoc, {
			...(data || {}),
			updated_at: Date.now(),
		}, { merge: true });
	} catch (error) {
		console.error(error);
	}
};
