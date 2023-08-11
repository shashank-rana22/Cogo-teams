import { isEmpty } from '@cogoport/utils';
import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

export const saveWebrtcToken = ({ data = {}, callingRoomId = '', tokenId = '', firestore = {} }) => {
	if (!callingRoomId) {
		return;
	}

	const savingData = data;

	if (savingData?.token?.type === 'transceiverRequest' && isEmpty(savingData?.token?.transceiverRequest?.init)) {
		savingData.token.transceiverRequest.init = {};
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
				...(savingData || {}),
				updated_at: Date.now(),
			},
		);
	} catch (error) {
		console.error(error);
	}
};
