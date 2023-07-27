import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useRef } from 'react';
import Peer from 'simple-peer';

import { ICESERVER } from '../constants';
import { updateCallDetails } from '../helpers/snapshortHelpers';
import { callUpdate, saveCallData, saveWebrtcToken, stopStream } from '../utils/callFunctions';

import { useSetInACall } from './useSetInACall';

function useVideoCallFirebase({
	firestore,
	setCallComing,
	setCallDetails,
	setWebrtcToken,
	setToggleState,
	callDetails,
	setStreams,
	peerRef,
	videoCallId,
	updateVideoCallTimeline = () => {},
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));

	const newRoomRef = useRef(null);

	const { saveInACallStatus } = useSetInACall();

	const { callingRoomId = '' } = callDetails || {};

	const { id: userId, name: userName } = user_data || {};

	const handleCallEnd = useCallback(async ({ callActivity, time = 0, description = '' }) => {
		await saveInACallStatus(false);
		await setCallComing(false);

		const localPeerRef = peerRef;
		if (localPeerRef.current) {
			localPeerRef.current.destroy();
		}
		localPeerRef.current = null;

		await setCallDetails({
			myDetails          : {},
			peerDetails        : {},
			callingRoomDetails : {},
			callingRoomId      : '',
			webrtcTokenRoomId  : '',
			callingType        : '',
		});

		await setWebrtcToken({
			userToken : {},
			peerToken : {},
		});

		await setToggleState({
			isMicActive         : true,
			isVideoActive       : true,
			isScreenShareActive : false,
			isMinimize          : false,
		});

		await setStreams((prev) => {
			stopStream({ streamType: 'userStream', currentStream: prev });
			return {
				userStream : null,
				peerStream : null,
			};
		});
		updateVideoCallTimeline({ callActivity, time, description, videoCallId });
	}, [saveInACallStatus,
		setCallComing,
		peerRef,
		setCallDetails, setWebrtcToken, setToggleState, setStreams, updateVideoCallTimeline, videoCallId]);

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
				saveCallData({
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
					callBackFunc: (getCallingRoomId) => {
						saveWebrtcToken({
							data          : { user_token: data },
							callingRoomId : getCallingRoomId,
							tokenId       : userId,
							firestore,
						});
						setCallDetails((prev) => ({
							...prev,
							callingRoomId: getCallingRoomId,
						}));
					},
					firestore,
				});
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
					callingRoomId,
					firestore,
				});
				handleCallEnd({ callActivity: 'accepted' });
			});
		} catch (err) {
			console.error('my user stream error', err);
			callUpdate({
				data: {
					call_status   : 'technical_error',
					error_message : 'peer video audio is not working',
				},
				callingRoomId,
				firestore,
			});
			handleCallEnd({ callActivity: 'missed' });
		}
	}, [callingRoomId, handleCallEnd, firestore,
		peerRef, saveInACallStatus, setCallDetails, setStreams, userId, userName]);

	const handleOutgoingCall = useCallback(
		(peerDetails = {}) => {
			if (!peerDetails?.user_id) {
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
				peerId            : peerDetails.user_id,
				webrtcTokenRoomId : userId,
				callingType       : 'outgoing',
			}));
			callingToMediaStream(peerDetails);
		},
		[setCallDetails, callingToMediaStream, userName, userId],
	);

	useEffect(() => {
		const unsubscribe = newRoomRef?.current;

		updateCallDetails({
			newRoomRef, callingRoomId, firestore, setCallDetails,
		});

		return () => {
			unsubscribe?.();
		};
	}, [callingRoomId, firestore, setCallDetails]);

	return {
		handleOutgoingCall,
		handleCallEnd,
	};
}

export default useVideoCallFirebase;
