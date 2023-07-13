import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

function useCommingCall({
	firestore,
	// setCallDetails,
	callDetails,
	setInACall,
	setCallComming,
	callUpdate,
	setStreams,
	peerRef,
	saveWebrtcToken,
}) {
	const [webrtcToken, setWebrtcToken] = useState({
		user_token : null,
		peer_token : null,
	});

	const getWebrtcToken = async () => {
		if (callDetails.webrtc_token_room_id) {
			const tokenDocRef = doc(
				firestore,
				FIRESTORE_PATH.webrtc_token,
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
		if (callDetails?.webrtc_token_room_id) {
			const tokenDocRef = doc(
				firestore,
				FIRESTORE_PATH.webrtc_token,
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
	}, [callDetails.webrtc_token_room_id, firestore]);

	const accepteCallMedia = () => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
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
					console.log('getting token');
					peer.signal(webrtcToken.user_token);
				}

				// console.log('calling peer.signal');

				peer.on('signal', (data) => {
					console.log(data, 'answer_peer');
					saveWebrtcToken(
						{ peer_token: data },
						callDetails.webrtc_token_room_id,
					);
				});
			})
			.catch((error) => {
				console.log('user stream is not working', error);
			});
	};

	const answerOfCall = () => {
		getWebrtcToken().then(() => {
			setInACall(true);
			setCallComming(false);
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
		setCallComming(false);
	};
	return {
		answerOfCall,
		rejectOfCall,
	};
}

export default useCommingCall;
