import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useRef } from 'react';
import Peer from 'simple-peer';

import { ICESERVER } from '../constants';
import { updateCallDetails } from '../helpers/snapshortHelpers';
import { callUpdate, saveCallData, saveWebrtcToken, stopStream } from '../utils/callFunctions';

import { useSetInACall } from './useSetInACall';

function useVideoCallFirebase({
	firestore = {},
	setCallComing = () => {},
	setCallDetails = () => {},
	setWebrtcToken = () => {},
	setToggleState = () => {},
	callDetails = {},
	setStreams = () => {},
	peerRef = {},
	videoCallId = '',
	updateVideoCallTimeline = () => {},
}) {
	const { user_data = {} } = useSelector((state) => ({
		user_data: state.profile.user,
	}));

	const newRoomRef = useRef(null);

	const { saveInACallStatus = () => {} } = useSetInACall();

	const { id: userId, name: userName } = user_data || {};
	const { callingRoomId = '' } = callDetails || {};

	const handleCallEnd = useCallback(async ({ callActivity = '', duration = 0, description = '' }) => {
		setCallComing(false);

		const localPeerRef = peerRef;
		if (localPeerRef.current) {
			localPeerRef.current.destroy();
		}
		localPeerRef.current = null;

		setCallDetails({
			myDetails          : {},
			peerDetails        : {},
			callingRoomDetails : {},
			callingRoomId      : '',
			webrtcTokenRoomId  : '',
			callingType        : '',
		});

		setWebrtcToken({});

		setToggleState({
			isMicActive         : true,
			isVideoActive       : true,
			isScreenShareActive : false,
			isMinimize          : false,
		});

		setStreams((prev) => {
			stopStream({ streamType: 'userStream', currentStream: prev });
			return {
				userStream : null,
				peerStream : null,
			};
		});

		if (videoCallId) {
			await updateVideoCallTimeline({ callActivity, duration, description, videoCallId });
		}

		saveInACallStatus({ inACallStatus: false });
	}, [saveInACallStatus,
		setCallComing,
		peerRef,
		setCallDetails, setWebrtcToken, setToggleState, setStreams, updateVideoCallTimeline, videoCallId]);

	const callingToMediaStream = useCallback(async ({ peerDetails = {}, videoCallIdFirebase = '' }) => {
		try {
			const myStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

			saveInACallStatus({ inACallStatus: true });
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
			let callOneTimeSaveInitialToken = true;

			peer.on('signal', (data) => {
				if (callOneTimeSaveInitialToken) {
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
							video_call_id        : videoCallIdFirebase,
						},
						callingRoomId : videoCallIdFirebase,
						callBackFunc  : (getCallingRoomId) => {
							saveWebrtcToken({
								data          : { token: data, token_for: peerDetails?.user_id },
								callingRoomId : getCallingRoomId,
								tokenId       : userId,
								firestore,
							});
						},
						firestore,
					});
					callOneTimeSaveInitialToken = false;
				} else {
					saveWebrtcToken({
						data          : { token: data, token_for: peerDetails?.user_id },
						callingRoomId : videoCallIdFirebase,
						tokenId       : userId,
						firestore,
					});
				}
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
					callingRoomId: videoCallIdFirebase,
					firestore,
				});
				handleCallEnd({ callActivity: 'answered', description: 'peer js technical error' });
			});

			peer.on('close', () => {
				handleCallEnd({
					callActivity : 'answered',
					description  : 'call is closed',
				});
				callUpdate({
					data: {
						call_status: 'call_end',
					},
					callingRoomId: videoCallIdFirebase,
					firestore,
				});
			});
		} catch (err) {
			Toast.error('Please provide your Mic permission');
			console.error('my user stream error', err);
			callUpdate({
				data: {
					call_status   : 'technical_error',
					error_message : 'peer audio is not working',
				},
				callingRoomId: videoCallIdFirebase,
				firestore,
			});
			handleCallEnd({ callActivity: 'missed', description: 'peer video audio is not working' });
		}
	}, [saveInACallStatus, setStreams, peerRef, userName, userId, firestore, handleCallEnd]);

	const handleOutgoingCall = useCallback(
		({ peerDetails = {}, videoCallIdFirebase = '' }) => {
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
				callingRoomId     : videoCallIdFirebase,
			}));
			callingToMediaStream({ peerDetails, videoCallIdFirebase });
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
