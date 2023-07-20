import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import {
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { useEffect, useCallback } from 'react';
import Peer from 'simple-peer';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { ICESERVER } from '../constants';
import { callUpdate, saveCallingData, saveWebrtcToken, stopStream } from '../utils';

function useVideoCallFirebase({
	firestore,
	setCallComing,
	setInACall,
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
	const { id: userId, name: userName } = user_data || {};

	const callEnd = useCallback(() => {
		setInACall(false);
		setCallComing(false);

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

		setStreams((prev) => {
			stopStream('user_stream', prev);
			stopStream('video_stream', prev);
			stopStream('screen_stream', prev);
			return {
				user_stream   : null,
				peer_stream   : null,
				screen_stream : null,
			};
		});
	}, [setInACall, setCallComing, peerRef, setCallDetails, setWebrtcToken, setOptions, setStreams]);

	const callingTo = useCallback(
		(peer_details = {}) => {
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
							data: {
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
							},
							callBackFunc: (calling_room_id) => {
								saveWebrtcToken(
									{
										data : { user_token: data },
										calling_room_id,
										path : userId,
										firestore,
									},
								);
								setCallDetails((prev) => ({
									...prev,
									calling_room_id,
								}));
							},
							firestore,
						});
					});

					peer.on('stream', (peerStream) => {
						setStreams((prev) => ({ ...prev, peer_stream: peerStream }));
					});

					peer.on('error', () => {
						callEnd();
						callUpdate({
							data: {
								call_status: 'technical_error',
							},
							firestore,
							calling_room_id: callDetails?.calling_room_id,
						});
					});
				});
		},
		[setCallDetails, userName, userId, setInACall, setStreams, peerRef,
			callEnd, firestore, callDetails?.calling_room_id],
	);

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
					webrtc_token_room_id : room_data?.webrtc_token_room_id,
				}));
			});
		}
	}, [callDetails?.calling_room_id, callEnd, firestore, setCallDetails]);

	return {
		callingTo,
		callEnd,
		stopStream,
	};
}

export default useVideoCallFirebase;
