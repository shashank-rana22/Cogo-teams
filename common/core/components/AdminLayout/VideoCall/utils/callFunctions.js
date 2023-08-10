import { isEmpty } from '@cogoport/utils';
import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const stopStream = ({ streamType = '', currentStream = {} }) => {
	if (isEmpty(currentStream) || !currentStream[streamType]) {
		return;
	}

	const tracks = currentStream[streamType]?.getTracks();

	tracks.forEach((track) => {
		track.stop();
	});
};

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
			...data,
			updated_at: Date.now(),
		}, { merge: true });
	} catch (error) {
		console.error(error);
	}
};

export const saveCallData = async ({ data = {}, callingRoomId = '', callBackFunc = () => {}, firestore = {} }) => {
	const videoCallRoomCollection = doc(
		firestore,
		`${FIRESTORE_PATH.video_calls}/${callingRoomId}`,
	);

	try {
		const dataToSave = {
			...data,
			updated_at : Date.now(),
			created_at : Date.now(),
		};
		setDoc(videoCallRoomCollection, dataToSave);
		callBackFunc(callingRoomId);
	} catch (error) {
		console.error(error);
	}
};

export const saveWebrtcToken = ({ data = {}, callingRoomId = '', tokenId = '', firestore = {} }) => {
	const savingData = data;

	if (data?.token?.type === 'transceiverRequest') {
		savingData.token.transceiverRequest.init = {};
	}

	if (!callingRoomId) {
		return;
	}

	const webrtcTokenRoomDoc = doc(
		firestore,
		`${FIRESTORE_PATH.video_calls}/${callingRoomId}/${FIRESTORE_PATH.webrtc_token}`,
		tokenId,
	);

	try {
		setDoc(
			webrtcTokenRoomDoc,
			{
				...savingData,
				updated_at: Date.now(),
			},
		);
	} catch (error) {
		console.error(error);
	}
};
