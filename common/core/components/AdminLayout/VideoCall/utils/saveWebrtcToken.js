import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const saveWebrtcToken = ({ data = {}, callingRoomId = '', tokenId = '', firestore = {} }) => {
	const savingData = (data || {});

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
