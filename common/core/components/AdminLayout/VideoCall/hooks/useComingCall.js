import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useComingCall({
	firestore,
	callDetails,
	setInACall,
	setCallComing,
	callUpdate,
	setStreams,
	peerRef,
	saveWebrtcToken,
	webrtcToken,
	setWebrtcToken,
	callEnd,
}) {
	const { calling_details } = callDetails || {};
	const getWebrtcToken = async () => {
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
			} else {
				console.log('No such document!');
			}
		}
	};

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

	const accepteCallMedia = () => {
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

				// console.log('calling peer.signal');

				peer.on('signal', (data) => {
					saveWebrtcToken(
						{ peer_token: data },
						callDetails.calling_room_id,
						callDetails.webrtc_token_room_id,
					);
				});

				peer.on('track', (track, stream) => {
					console.log(track, 'truck', stream, 'in call answerOfCall');
				});

				peer.on('stream', (peerStream) => {
					console.log('stream connected');
					setStreams((prev) => ({ ...prev, peer_stream: peerStream }));
				});

				peer.on('error', () => {
					callEnd();
					callUpdate({
						call_status: 'technical_error',
					});
				});
			})
			.catch((error) => {
				console.log('user stream is not working', error);
			});
	};

	const answerOfCall = () => {
		getWebrtcToken().then(() => {
			setInACall(true);
			setCallComing(false);
			callUpdate({
				call_status: 'accepted',
			});
			accepteCallMedia();
		});
	};

	const rejectOfCall = () => {
		callUpdate({
			call_status: 'rejected',
		});
		setCallComing(false);
	};

	useEffect(() => {
		const notCallingCallStatus = ['rejected', 'end_call', 'accepted'];

		if (notCallingCallStatus.includes(calling_details?.call_status)) {
			setCallComing(false);
		}
	}, [calling_details, setCallComing]);

	return {
		answerOfCall,
		rejectOfCall,
	};
}

export default useComingCall;
