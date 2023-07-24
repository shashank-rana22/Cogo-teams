import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const stopStream = ({ stream_type, current_stream }) => {
	if (!current_stream || !current_stream[stream_type]) {
		return;
	}

	const tracks = current_stream[stream_type].getTracks();

	tracks.forEach((track) => {
		track.stop();
	});
};

export const callUpdate = ({ data, firestore, callingRoomId }) => {
	if (callingRoomId) {
		try {
			const videCallRoomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${callingRoomId}`,
			);

			updateDoc(videCallRoomDoc, {
				...data,
				updated_at: Date.now(),
			});
		} catch (error) {
			console.error(error);
		}
	}
};

export const saveCallingData = async ({ data, callBackFunc, firestore }) => {
	const videoCallRoomCollection = collection(
		firestore,
		`${FIRESTORE_PATH.video_calls}`,
	);

	try {
		const data_to_save = {
			...data,
			updated_at : Date.now(),
			created_at : Date.now(),
		};
		const doc_data = await addDoc(videoCallRoomCollection, data_to_save);
		callBackFunc(doc_data.id);
	} catch (error) {
		console.error(error);
	}
};

export const saveWebrtcToken = ({ data, callingRoomId, path, firestore }) => {
	if (callingRoomId) {
		const WebrtcTokenRoomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.video_calls}/${callingRoomId}/${FIRESTORE_PATH.webrtc_token}/${path}`,
		);

		try {
			setDoc(
				WebrtcTokenRoomDoc,
				{
					...data,
					updated_at: Date.now(),
				},
				{ merge: true },
			);
		} catch (error) {
			console.error(error);
		}
	}
};
