import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { collection, doc, limit, onSnapshot, query, where } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const ONE = 1;

export const updateCallDetails = ({
	newRoomRef, callingRoomId, firestore, setCallDetails,
}) => {
	const snapshotRef = newRoomRef;

	snapshotRef?.current?.();

	if (!callingRoomId) {
		return;
	}

	const videoCallDocRef = doc(
		firestore,
		FIRESTORE_PATH.video_calls,
		callingRoomId,
	);

	snapshotRef.current = onSnapshot(videoCallDocRef, (roomDocument) => {
		const roomData = roomDocument.data();

		setCallDetails((prev) => ({
			...prev,
			callingRoomDetails : roomData,
			webrtcTokenRoomId  : roomData?.webrtc_token_room_id,
		}));
	});
};

export const getCallingRoomData = ({
	callingRoomId, firestore, inVideoCall, setCallComing,
	setCallDetails, userId, callComingSnapshotRef,
}) => {
	const lacalRef = callComingSnapshotRef;

	lacalRef?.current?.();

	const videoCallRef = collection(firestore, FIRESTORE_PATH.video_calls);
	const videoCallComingQuery = query(
		videoCallRef,
		where('call_status', '==', 'calling'),
		where('calling_by', '==', 'user'),
		where('peer_id', '==', userId),
		limit(ONE),
	);

	lacalRef.current = onSnapshot(videoCallComingQuery, (querySnapshot) => {
		const callingRoom = querySnapshot?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

		if (!isEmpty(callingRoom) && !inVideoCall && !callingRoomId) {
			setCallDetails((prev) => ({
				...prev,
				peer_details       : callingRoom?.peer_details,
				callingRoomDetails : callingRoom,
				callingRoomId      : callingRoom?.id,
				callingType        : 'incoming',
				webrtcTokenRoomId  : callingRoom?.webrtc_token_room_id,
			}));
			setCallComing(true);
		}
	});
};

export const getTokenData = ({ webrtcTokenRoomId, callingRoomId, firestore, setWebrtcToken, tokenSnapshotRef }) => {
	const localTokenSnapshotRef = tokenSnapshotRef;
	localTokenSnapshotRef?.current?.();

	if (webrtcTokenRoomId && callingRoomId) {
		const tokenDocRef = doc(
			firestore,
			`${FIRESTORE_PATH.video_calls}/${callingRoomId}/${FIRESTORE_PATH.webrtc_token}`,
			webrtcTokenRoomId,
		);
		localTokenSnapshotRef.current = onSnapshot(tokenDocRef, (docp) => {
			const roomData = docp.data();
			setWebrtcToken((prev) => ({
				...prev,
				peerToken : roomData?.peer_token,
				userToken : roomData?.user_token,
			}));
		});
	}
};
