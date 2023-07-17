import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
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
	// callComing,
	inACall,
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));
	const { id: userId, name: userName } = user_data || {};
	const dispatch = useDispatch();

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
		dispatch(
			setProfileState({
				video_call_recipient_data : {},
				is_in_video_call          : false,
			}),
		);

		setInACall(false);
		setCallComing(false);
		stopStream('screen_stream');
		stopStream('user_stream');
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
			isMaximize          : false,
		});
		setStreams({
			user_stream   : null,
			peer_stream   : null,
			screen_stream : null,
		});
	}, [dispatch, setInACall, stopStream, peerRef, setCallDetails,
		setWebrtcToken, setOptions, setStreams, setCallComing]);

	const callingTo = useCallback((peer_details = {}) => {
		setCallDetails((prev) => ({
			...prev,
			call_status : 'calling',
			calling_by  : 'admin',
			my_details  : {
				name      : userName,
				user_id   : userId,
				user_type : 'admin',
			},
			peer_details,
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
						call_status  : 'calling',
						calling_by   : 'admin',
						peer_details : {
							name      : userName,
							user_id   : userId,
							user_type : 'admin',
						},
						webrtc_token_room_id: userId,
					}).then((calling_room_id) => {
						saveWebrtcToken({ user_token: data }, calling_room_id, userId);
					});
				});

				peer.on('stream', (peerStream) => {
					console.log('stream connected');
					setStreams((prev) => ({ ...prev, peer_stream: peerStream }));
				});
			});
	}, [peerRef, saveCallingData, saveWebrtcToken, setCallDetails, setInACall, setStreams, userId, userName]);

	useEffect(() => {
		const videoCallRef = collection(firestore, FIRESTORE_PATH.video_calls);
		const videoCallComingQuery = query(
			videoCallRef,
			where('call_status', '==', 'calling'),
			where('calling_by', '==', 'user'),
			where('peer_id', '==', 'a356bdf7-153e-4054-a76e-ccd5538baac3'),
		);

		onSnapshot(videoCallComingQuery, (querySnapshot) => {
			querySnapshot.forEach((val) => {
				if (!inACall) {
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
				}
			});
		});
	}, [firestore, inACall, setCallComing, setCallDetails]);

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
				const endCallStatus = ['rejected', 'end_call', 'technical_error'];
				if (
					room_data?.call_status
					&& endCallStatus.includes(room_data?.call_status)
					&& callDetails?.calling_room_id
				) {
					callEnd();
				}
			});
		}
	}, [callDetails?.calling_room_id, callEnd, firestore, setCallDetails]);

	return {
		callingTo,
		callUpdate,
		callEnd,
		stopStream,
		saveWebrtcToken,
	};
}

export default useVideoCallFirebase;
