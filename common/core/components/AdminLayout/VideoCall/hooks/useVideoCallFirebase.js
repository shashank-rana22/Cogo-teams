import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import {
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useEffect, useCallback, useRef } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { ICESERVER } from '../constants';
import { callUpdate, saveCallingData, saveWebrtcToken, stopStream } from '../utils/callFunctions';

import { useSetInACall } from './useSetInACall';

function useVideoCallFirebase({
	firestore,
	setCallComing,
	setCallDetails,
	setWebrtcToken,
	setOptions,
	callDetails,
	setStreams,
	peerRef,
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));

	const newRoomRef = useRef(null);

	const { saveInACallStatus } = useSetInACall();

	const { id: userId, name: userName } = user_data || {};

	const callEnd = useCallback(() => {
		saveInACallStatus(false);
		setCallComing(false);

		const localPeerRef = peerRef;
		if (localPeerRef.current) {
			localPeerRef.current.destroy();
		}
		localPeerRef.current = null;

		setCallDetails({
			myDetails          : null,
			peerDetails        : null,
			callingRoomDetails : null,
			callingRoomId      : null,
			webrtcTokenRoomId  : null,
			callingType        : null,
		});

		setWebrtcToken({
			userToken : null,
			peerToken : null,
		});

		setOptions({
			isMicActive         : true,
			isVideoActive       : true,
			isScreenShareActive : false,
			isMinimize          : false,
		});

		setStreams((prev) => {
			stopStream({ stream_type: 'userStream', current_stream: prev });
			return {
				userStream : null,
				peerStream : null,
			};
		});
	}, [saveInACallStatus, setCallComing, peerRef, setCallDetails, setWebrtcToken, setOptions, setStreams]);

	const callingToMediaStream = useCallback(async (peerDetails) => {
		try {
			const myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

			saveInACallStatus(true);
			setStreams((prev) => ({ ...prev, userStream: myStream }));

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
					data: {
						call_status : 'calling',
						calling_by  : 'admin',
						my_details  : {
							user_name : userName,
							user_id   : userId,
							user_type : 'admin',
						},
						peer_details         : peerDetails,
						peer_id              : peerDetails?.user_id,
						webrtc_token_room_id : userId,
					},
					callBackFunc: (callingRoomId) => {
						saveWebrtcToken({
							data : { user_token: data },
							callingRoomId,
							path : userId,
							firestore,
						});
						setCallDetails((prev) => ({
							...prev,
							callingRoomId,
						}));
					},
					firestore,
				});
			});

			peer.on('stream', (peerStream) => {
				setStreams((prev) => ({ ...prev, peerStream }));
			});

			peer.on('error', () => {
				callEnd();
				callUpdate({
					data: {
						call_status   : 'technical_error',
						error_message : 'peer js technical error',
					},
					callingRoomId: callDetails?.callingRoomId,
					firestore,
				});
			});
		} catch (err) {
			console.error('my user stream error', err);
			callUpdate({
				data: {
					call_status   : 'technical_error',
					error_message : 'peer video audio is not working',
				},
				callingRoomId: callDetails?.callingRoomId,
				firestore,
			});
			callEnd();
		}
	}, [callDetails?.callingRoomId, callEnd, firestore,
		peerRef, saveInACallStatus, setCallDetails, setStreams, userId, userName]);

	const callingTo = useCallback(
		(peerDetails = {}) => {
			if (isEmpty(peerDetails?.user_id)) {
				return;
			}

			setCallDetails((prev) => ({
				...prev,
				callStatus : 'calling',
				callingBy  : 'admin',
				myDetails  : {
					user_name : userName,
					user_id   : userId,
					user_type : 'admin',
				},
				peerDetails,
				peerId            : peerDetails?.user_id,
				webrtcTokenRoomId : userId,
				callingType       : 'outgoing',
			}));
			callingToMediaStream(peerDetails);
		},
		[setCallDetails, callingToMediaStream, userName, userId],
	);

	const updateCallRoom = useCallback(() => {
		newRoomRef?.current?.();

		if (callDetails?.callingRoomId) {
			const videoCallDocRef = doc(
				firestore,
				FIRESTORE_PATH.video_calls,
				callDetails?.callingRoomId,
			);
			newRoomRef.current = onSnapshot(videoCallDocRef, (dop) => {
				const room_data = dop.data();
				setCallDetails((prev) => ({
					...prev,
					callingRoomDetails : room_data,
					webrtcTokenRoomId  : room_data?.webrtc_token_room_id,
				}));
			});
		}
	}, [callDetails?.callingRoomId, firestore, setCallDetails]);

	useEffect(() => {
		updateCallRoom();

		return () => {
			newRoomRef?.current?.();
		};
	}, [updateCallRoom]);

	return {
		callingTo,
		callEnd,
	};
}

export default useVideoCallFirebase;
