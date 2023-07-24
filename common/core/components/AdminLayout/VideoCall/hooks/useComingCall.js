import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useCallback, useRef } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { getCallingRoomData, getTokenData } from '../helpers/snapshortHelpers';
import { callUpdate, saveWebrtcToken } from '../utils/callFunctions';

import { useSetInACall } from './useSetInACall';

function useComingCall({
	firestore,
	setCallDetails,
	callDetails,
	inVideoCall,
	setCallComing,
	setStreams,
	peerRef,
	webrtcToken,
	setWebrtcToken,
	callEnd,
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));
	const { id: userId } = user_data || {};
	const { callingRoomId = '', webrtcTokenRoomId = '' } = callDetails || {};

	const { saveInACallStatus } = useSetInACall();
	const callComingSnapshotRef = useRef(null);
	const tokenSnapshotRef = useRef(null);

	const getWebrtcToken = useCallback(async () => {
		if (webrtcTokenRoomId && callingRoomId) {
			const tokenDocRef = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${callingRoomId}/${FIRESTORE_PATH.webrtc_token}`,
				webrtcTokenRoomId,
			);
			const docSnap = await getDoc(tokenDocRef);
			if (docSnap.exists()) {
				const token = docSnap.data();
				setWebrtcToken((prev) => ({ ...prev, userToken: token?.user_token }));
			}
		}
	}, [webrtcTokenRoomId, callingRoomId, firestore, setWebrtcToken]);

	const accepteCallMedia = useCallback(async () => {
		try {
			const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

			setStreams((prev) => ({ ...prev, userStream }));
			const peer = new Peer({
				initiator : false,
				trickle   : false,
				stream    : userStream,
			});

			const localPeerRef = peerRef;
			localPeerRef.current = peer;

			if (!isEmpty(webrtcToken.userToken)) {
				peer.signal(webrtcToken.userToken);
			}

			peer.on('signal', (data) => {
				saveWebrtcToken(
					{
						data : { peer_token: data },
						callingRoomId,
						path : webrtcTokenRoomId,
						firestore,
					},
				);
			});

			peer.on('stream', (peerStream) => {
				setStreams((prev) => ({ ...prev, peerStream }));
			});

			peer.on('error', () => {
				callUpdate({
					data: {
						call_status   : 'technical_error',
						error_message : 'peer js technical error',
					},
					firestore,
					callingRoomId,
				});
				callEnd();
			});
		} catch (error) {
			console.error('user stream is not working', error);

			callUpdate({
				data: {
					call_status   : 'technical_error',
					error_message : 'peer video audio is not working',
				},
				callingRoomId,
				firestore,
			});
			callEnd();
		}
	}, [setStreams, peerRef, webrtcToken.userToken, callingRoomId, webrtcTokenRoomId, firestore, callEnd]);

	const answerCall = useCallback(async () => {
		await getWebrtcToken();
		saveInACallStatus(true);
		setCallComing(false);

		callUpdate({
			data: {
				call_status: 'accepted',
			},
			firestore,
			callingRoomId,
		});

		accepteCallMedia();
	}, [accepteCallMedia, callingRoomId, firestore, getWebrtcToken, saveInACallStatus, setCallComing]);

	const rejectCall = useCallback(() => {
		callUpdate({
			data: {
				call_status: 'rejected',
			},
			firestore,
			callingRoomId,
		});

		setCallComing(false);
	}, [callingRoomId, firestore, setCallComing]);

	useEffect(() => {
		const loaclcalComingSnapshotRef = callComingSnapshotRef;
		getCallingRoomData({
			callingRoomId,
			firestore,
			inVideoCall,
			setCallComing,
			setCallDetails,
			userId,
			callComingSnapshotRef,
		});

		return () => {
			loaclcalComingSnapshotRef?.current?.();
		};
	}, [callingRoomId, firestore, inVideoCall, setCallComing, setCallDetails, userId]);

	useEffect(() => {
		const loaclTokenSnapshotRef = tokenSnapshotRef;
		getTokenData({ webrtcTokenRoomId, callingRoomId, firestore, setWebrtcToken, tokenSnapshotRef });

		return () => {
			loaclTokenSnapshotRef?.current?.();
		};
	}, [callingRoomId, firestore, setWebrtcToken, webrtcTokenRoomId]);

	useEffect(() => {
		const room_data = callDetails?.callingRoomDetails;
		const notCallingCallStatus = ['rejected', 'end_call', 'miss_call', 'technical_error'];
		const stopCallStatus = ['rejected', 'end_call', 'technical_error'];

		if (
			room_data?.call_status
			&& room_data?.call_status !== 'calling'
			&& stopCallStatus.includes(room_data?.call_status)
			&& callingRoomId
		) {
			callEnd();
		}

		if (notCallingCallStatus.includes(room_data?.call_status)) {
			setCallComing(false);
		}
	}, [callDetails?.callingRoomDetails, callEnd, setCallComing, callingRoomId]);

	return {
		answerCall,
		rejectCall,
	};
}

export default useComingCall;
