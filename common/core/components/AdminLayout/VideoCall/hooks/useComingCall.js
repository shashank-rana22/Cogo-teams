import { useSelector } from '@cogoport/store';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useCallback } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { callUpdate, saveWebrtcToken } from '../utils';

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
	const { saveInACallStatus } = useSetInACall();

	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));
	const { id: userId } = user_data || {};

	const getWebrtcToken = useCallback(async () => {
		if (callDetails.webrtc_token_room_id && callDetails.calling_room_id) {
			const tokenDocRef = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${callDetails.calling_room_id}/${FIRESTORE_PATH.webrtc_token}`,
				callDetails.webrtc_token_room_id,
			);
			const docSnap = await getDoc(tokenDocRef);
			if (docSnap.exists()) {
				const token = docSnap.data();
				setWebrtcToken((prev) => ({ ...prev, user_token: token?.user_token }));
			}
		}
	}, [callDetails.calling_room_id, callDetails.webrtc_token_room_id, firestore, setWebrtcToken]);

	const accepteCallMedia = useCallback(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((userStream) => {
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
				const peer = new Peer({
					initiator : false,
					trickle   : false,
					stream    : userStream,
				});
				const localPeerRef = peerRef;
				localPeerRef.current = peer;

				if (webrtcToken.user_token) {
					peer.signal(webrtcToken.user_token);
				}

				peer.on('signal', (data) => {
					saveWebrtcToken(
						{
							data            : { peer_token: data },
							calling_room_id : callDetails.calling_room_id,
							path            : callDetails.webrtc_token_room_id,
							firestore,
						},
					);
				});

				peer.on('stream', (peerStream) => {
					setStreams((prev) => ({ ...prev, peer_stream: peerStream }));
				});

				peer.on('error', () => {
					callUpdate({
						data: {
							call_status: 'technical_error',
						},
						firestore,
						calling_room_id: callDetails?.calling_room_id,
					});
					callEnd();
				});
			})
			.catch((error) => {
				console.error('user stream is not working', error);
			});
	}, [callDetails.calling_room_id, callDetails.webrtc_token_room_id,
		callEnd, firestore, peerRef, setStreams, webrtcToken.user_token]);

	const answerOfCall = useCallback(() => {
		getWebrtcToken().then(() => {
			saveInACallStatus(true);
			setCallComing(false);

			callUpdate({
				data: {
					call_status: 'accepted',
				},
				firestore,
				calling_room_id: callDetails?.calling_room_id,
			});

			accepteCallMedia();
		});
	}, [accepteCallMedia, callDetails?.calling_room_id, firestore, getWebrtcToken, saveInACallStatus, setCallComing]);

	const rejectOfCall = useCallback(() => {
		callUpdate({
			data: {
				call_status: 'rejected',
			},
			firestore,
			calling_room_id: callDetails?.calling_room_id,
		});

		setCallComing(false);
	}, [callDetails?.calling_room_id, firestore, setCallComing]);

	useEffect(() => {
		if (callDetails?.webrtc_token_room_id && callDetails?.calling_room_id) {
			const tokenDocRef = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${callDetails.calling_room_id}/${FIRESTORE_PATH.webrtc_token}`,
				callDetails.webrtc_token_room_id,
			);
			onSnapshot(tokenDocRef, (dop) => {
				const room_data = dop.data();
				setWebrtcToken((prev) => ({
					...prev,
					peer_token : room_data?.peer_token,
					user_token : room_data?.user_token,
				}));
			});
		}
	}, [callDetails.calling_room_id, callDetails.webrtc_token_room_id, firestore, setWebrtcToken]);

	useEffect(() => {
		const room_data = callDetails?.calling_details;
		const notCallingCallStatus = ['rejected', 'end_call', 'miss_call', 'technical_error'];
		const stopCallStatus = ['rejected', 'end_call', 'technical_error'];
		if (
			room_data?.call_status
			&& stopCallStatus.includes(room_data?.call_status)
			&& callDetails?.calling_room_id
		) {
			callEnd();
		}

		if (notCallingCallStatus.includes(room_data?.call_status)) {
			setCallComing(false);
		}
	}, [callDetails?.calling_details, callDetails?.calling_room_id, callEnd, setCallComing]);

	useEffect(() => {
		const videoCallRef = collection(firestore, FIRESTORE_PATH.video_calls);
		const videoCallComingQuery = query(
			videoCallRef,
			where('call_status', '==', 'calling'),
			where('calling_by', '==', 'user'),
			where('peer_id', '==', userId),
		);

		onSnapshot(videoCallComingQuery, (querySnapshot) => {
			querySnapshot.forEach((val) => {
				if (inVideoCall === false) {
					const room_data = val.data();
					setCallDetails((prev) => ({
						...prev,
						peer_details         : room_data.peer_details,
						calling_details      : room_data,
						calling_room_id      : val.id,
						calling_type         : 'incoming',
						webrtc_token_room_id : room_data?.webrtc_token_room_id,
					}));
					setCallComing(true);
				} else {
					console.error('you are already in a call aready');
				}
			});
		});
	}, [firestore, inVideoCall, setCallComing, setCallDetails, userId]);

	return {
		answerOfCall,
		rejectOfCall,
	};
}

export default useComingCall;
