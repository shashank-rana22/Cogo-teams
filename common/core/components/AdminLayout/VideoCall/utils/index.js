import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const stopStream = (stream_type, current_stream) => {
	if (!current_stream) return;

	if (!current_stream[stream_type]) return;

	const tracks = current_stream[stream_type].getTracks();
	tracks.forEach((track) => {
		track.stop();
	});
};

export const callUpdate = ({ data, firestore, calling_room_id }) => {
	if (calling_room_id) {
		try {
			const videCallRoomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${calling_room_id}`,
			);

			updateDoc(videCallRoomDoc, {
				updated_at: Date.now(),
				...data,
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
			updated_at : Date.now(),
			created_at : Date.now(),
			...data,
		};
		const doc_data = await addDoc(videoCallRoomCollection, data_to_save);
		callBackFunc(doc_data.id);
	} catch (error) {
		console.error(error);
	}
};

export const saveWebrtcToken = async ({ data, calling_room_id, path, firestore }) => {
	if (calling_room_id) {
		const WebrtcTokenRoomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.video_calls}/${calling_room_id}/${FIRESTORE_PATH.webrtc_token}/${path}`,
		);

		try {
			await setDoc(
				WebrtcTokenRoomDoc,
				{
					updated_at: Date.now(),
					...data,
				},
				{ merge: true },
			);
		} catch (error) {
			console.error(error);
		}
	}
};
