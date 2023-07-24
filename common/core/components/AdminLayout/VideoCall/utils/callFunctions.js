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
	if (!callingRoomId) {
		return;
	}

	try {
		const videCallRoomDoc = doc(
			firestore,
			FIRESTORE_PATH.video_calls,
			callingRoomId,
		);

		updateDoc(videCallRoomDoc, {
			...data,
			updated_at: Date.now(),
		});
	} catch (error) {
		console.error(error);
	}
};

export const saveCallData = async ({ data, callBackFunc, firestore }) => {
	const videoCallRoomCollection = collection(
		firestore,
		`${FIRESTORE_PATH.video_calls}`,
	);

	try {
		const dataToSave = {
			...data,
			updated_at : Date.now(),
			created_at : Date.now(),
		};
		const docData = await addDoc(videoCallRoomCollection, dataToSave);
		callBackFunc(docData.id);
	} catch (error) {
		console.error(error);
	}
};

export const saveWebrtcToken = ({ data, callingRoomId, tokenId, firestore }) => {
	if (callingRoomId) {
		const webrtcTokenRoomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.video_calls}/${callingRoomId}/${FIRESTORE_PATH.webrtc_token}`,
			tokenId,
		);

		try {
			setDoc(
				webrtcTokenRoomDoc,
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
