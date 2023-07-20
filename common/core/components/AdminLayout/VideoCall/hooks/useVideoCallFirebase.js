import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
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
import { stopStream } from '../utils';

// eslint-disable-next-line max-lines-per-function
function useVideoCallFirebase({
	firestore,
	setCallComing,
	setInACall,
	setCallDetails,
	setWebrtcToken,
	setOptions,
	callDetails,
	setStreams,
	streams,
	peerRef,
	inVideoCall,
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));
	const { id: userId, name: userName } = user_data || {};

	const saveWebrtcToken = useCallback(async (data, calling_room_id, path) => {
		if (calling_room_id) {
			const WebrtcTokenRoomDoc = doc(
				firestore,
				`${FIRESTORE_PATH.video_calls}/${calling_room_id}/${FIRESTORE_PATH.webrtc_token}/${path}`,
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
		}
	}, [firestore]);

	const saveCallingData = useCallback(async (data) => {
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
			return doc_data.id;
		} catch (error) {
			console.error(error);
			return null;
		}
	}, [firestore, setCallDetails]);

	const callUpdate = useCallback((data) => {
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
	}, [callDetails, firestore]);

	const callEnd = useCallback(() => {
		setInACall(false);
		setCallComing(false);
		stopStream('user_stream', streams);
		stopStream('video_stream', streams);
		stopStream('screen_stream', streams);
		const localPeerRef = peerRef;
		if (localPeerRef.current) {
			localPeerRef.current.destroy();
		}
		localPeerRef.current = null;

		setCallDetails({
			my_details           : null,
			peer_details         : null,
			calling_details      : null,
			calling_room_id      : null,
			webrtc_token_room_id : null,
			calling_type         : null,
		});
		setWebrtcToken({
			user_token : null,
			peer_token : null,
		});
		setOptions({
			isMicActive         : true,
			isVideoActive       : true,
			isScreenShareActive : false,
			isMinimize          : false,
		});
		setStreams({
			user_stream   : null,
			peer_stream   : null,
			screen_stream : null,
		});
	}, [setInACall, setCallComing, streams, peerRef, setCallDetails, setWebrtcToken, setOptions, setStreams]);

	const callingTo = useCallback((peer_details = {}) => {
		if (isEmpty(peer_details?.user_id)) return;

		setCallDetails((prev) => ({
			...prev,
			call_status : 'calling',
			calling_by  : 'admin',
			my_details  : {
				user_name : userName,
				user_id   : userId,
				user_type : 'admin',
			},
			peer_details,
			peer_id              : peer_details?.user_id,
			webrtc_token_room_id : userId,
			calling_type         : 'outgoing',
		}));
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
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
					saveCallingData({
						call_status : 'calling',
						calling_by  : 'admin',
						my_details  : {
							user_name : userName,
							user_id   : userId,
							user_type : 'admin',
						},
						peer_details,
						peer_id              : peer_details?.user_id,
						webrtc_token_room_id : userId,
					}).then((calling_room_id) => {
						saveWebrtcToken({ user_token: data }, calling_room_id, userId);
					});
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
			});
	}, [callEnd, callUpdate, peerRef, saveCallingData, saveWebrtcToken,
		setCallDetails, setInACall, setStreams, userId, userName]);

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
						webrtc_token_room_id : room_data.webrtc_token_room_id,
					}));
					setCallComing(true);
				} else {
					console.log('in a call laready');
				}
			});
		});
	}, [firestore, inVideoCall, setCallComing, setCallDetails, userId]);

	useEffect(() => {
		if (callDetails?.calling_room_id) {
			const videoCallDocRef = doc(
				firestore,
				FIRESTORE_PATH.video_calls,
				callDetails?.calling_room_id,
			);
			onSnapshot(videoCallDocRef, (dop) => {
				const room_data = dop.data();
				setCallDetails((prev) => ({
					...prev,
					calling_details      : room_data,
					webrtc_token_room_id : room_data.webrtc_token_room_id,
				}));
			});
		}
	}, [callDetails?.calling_room_id, callEnd, firestore, setCallDetails]);

	useEffect(() => {
		const room_data = callDetails?.calling_details;
		const endCallStatus = ['rejected', 'end_call'];
		if (
			room_data?.call_status
			&& endCallStatus.includes(room_data?.call_status)
			&& callDetails?.calling_room_id
		) {
			callEnd();
		}
	}, [callDetails?.calling_details, callDetails?.calling_room_id, callEnd]);

	return {
		callingTo,
		callUpdate,
		callEnd,
		stopStream,
		saveWebrtcToken,
	};
}

export default useVideoCallFirebase;
