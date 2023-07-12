import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { useEffect, useCallback } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { ICESERVER } from '../constants';

function useVideoCallFirebase({
	firestore,
	setCallComming,
	setInACall,
	setCallDetails,
	callDetails,
	setStreams,
	streams,
	peerRef,
	callComming,
	inACall,
}) {
	const saveWebrtcToken = async (data, path_id) => {
		const WebrtcTokenRoomDoc = doc(
			firestore,
			`${FIRESTORE_PATH.webrtc_token}/${path_id}`,
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
	};

	const saveCallingData = async (data) => {
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
			setCallDetails((prev) => ({
				...prev,
				calling_details: {
					room_data: data_to_save,
				},
				calling_room_id: doc_data.id,
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const callUpdate = (data) => {
		if (callDetails?.calling_room_id) {
			const { calling_room_id } = callDetails;

			const videCallRoomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${calling_room_id}`,
			);

			try {
				updateDoc(videCallRoomDoc, {
					updated_at: Date.now(),
					...data,
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	const stopStream = useCallback((stream_type) => {
		if (!streams[stream_type]) return;

		const tracks = streams[stream_type].getTracks();
		tracks.forEach((track) => {
			track.stop();
		});
	}, [streams]);

	const callEnd = useCallback(() => {
		if (inACall) {
			setInACall(false);
			stopStream('screen_stream');
			stopStream('user_stream');
		}
		if (callComming) {
			setCallComming(false);
		}
	}, [inACall, callComming, setInACall, stopStream, setCallComming]);

	const callingTo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
			.then((myStream) => {
				setInACall(true);
				setStreams((prev) => ({ ...prev, user_stream: myStream }));

				const peer = new Peer({
					initiator : true,
					trickle   : false,
					config    : {
						iceServers: ICESERVER,
					},
					stream: myStream,
				});
				const localPeerRef = peerRef;
				localPeerRef.current = peer;

				peer.on('signal', (data) => {
					saveWebrtcToken(data, '12345');
					saveCallingData({
						call_status : 'calling',
						calling_by  : 'admin',
						peer_detils : {
							name      : 'Abhijit',
							user_id   : 'yueriow2345789302',
							user_type : 'partner',
						},
					});
					console.log(data, 'peer_data');
				});
			});
	};

	useEffect(() => {
		const videoCallRef = collection(firestore, FIRESTORE_PATH.video_calls);
		const videoCallCommingQuery = query(
			videoCallRef,
			where('call_status', '==', 'calling'),
			where('calling_by', '==', 'user'),
		);

		onSnapshot(videoCallCommingQuery, (querySnapshot) => {
			querySnapshot.forEach((val) => {
				setCallDetails((prev) => ({
					...prev,
					peer_details    : val.data().peer_detils,
					calling_details : val.data(),
					calling_room_id : val.id,
				}));
				setCallComming(true);
			});
		});
	}, [firestore, setCallComming, setCallDetails]);

	useEffect(() => {
		if (callDetails?.calling_room_id) {
			const videoCallDocRef = doc(
				firestore,
				FIRESTORE_PATH.video_calls,
				callDetails?.calling_room_id,
			);
			onSnapshot(videoCallDocRef, (dop) => {
				const room_data = dop.data();
				console.log(room_data?.call_status);
				const endCallStatus = ['rejected', 'end_call'];
				if (
					room_data?.call_status
					&& endCallStatus.includes(room_data?.call_status)
				) {
					callEnd();
				}
			});
		}
	}, [callDetails?.calling_room_id, callEnd, firestore]);

	return {
		callingTo,
		callUpdate,
		callEnd,
		stopStream,
	};
}

export default useVideoCallFirebase;
