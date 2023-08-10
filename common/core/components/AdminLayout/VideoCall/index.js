import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import IncomingCall from './components/IncomingCall';
import VideoCallScreen from './components/VideoCallScreen';
import { FIREBASE_CONFIG } from './configurations/firebase-config';
import { CALL_RING_TIME_LIMIT } from './constants';
import useComingCall from './hooks/useComingCall';
import useUpdateVideoCallTimeline from './hooks/useUpdateVideoCallTimeline';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import { callUpdate } from './utils/callFunctions';

function VideoCall({
	videoCallRecipientData = {},
	inVideoCall = false,
	videoCallId = '',
}) {
	const { user_data } = useSelector((state) => ({
		user_data: state.profile.user,
	}));
	const { id: userId } = user_data || {};

	const streamRef = useRef(null);
	const peerRef = useRef(null);

	const [callComing, setCallComing] = useState(false);
	const [webrtcToken, setWebrtcToken] = useState({});
	const [callDetails, setCallDetails] = useState({
		myDetails          : {},
		peerDetails        : {},
		callingRoomDetails : {},
		callingRoomId      : '',
		webrtcTokenRoomId  : '',
		callingType        : '',
	});
	const [streams, setStreams] = useState({
		userStream : null,
		peerStream : null,
	});
	const [toggleState, setToggleState] = useState({
		isMicActive         : true,
		isVideoActive       : true,
		isScreenShareActive : false,
		isMinimize          : false,
	});

	const app = isEmpty(getApps()) ? initializeApp(FIREBASE_CONFIG) : getApp();
	const firestore = getFirestore(app);
	const { updateVideoCallTimeline = () => {} } = useUpdateVideoCallTimeline({ callDetails });

	const { handleOutgoingCall = () => {}, handleCallEnd = () => {} } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setCallDetails,
		setWebrtcToken,
		setToggleState,
		callDetails,
		setStreams,
		peerRef,
		videoCallId,
		updateVideoCallTimeline,
	});

	const { rejectCall = () => {}, answerCall = () => {} } = useComingCall({
		firestore,
		setCallDetails,
		callDetails,
		inVideoCall,
		setCallComing,
		setStreams,
		peerRef,
		webrtcToken,
		setWebrtcToken,
		handleCallEnd,
	});

	const missCallHandle = useCallback(() => {
		if (callDetails?.callingRoomDetails?.call_status === 'calling') {
			callUpdate({
				data          : { call_status: 'miss_call' },
				firestore,
				callingRoomId : videoCallId,
			});
			handleCallEnd({ callActivity: 'missed', description: 'user does not pick up the call' });
		}
	}, [videoCallId, callDetails?.callingRoomDetails?.call_status, handleCallEnd, firestore]);

	useEffect(
		() => {
			if (inVideoCall && videoCallRecipientData?.user_id && videoCallId) {
				handleOutgoingCall({ peerDetails: videoCallRecipientData, videoCallIdFirebase: videoCallId });
			}

			const timeoutMissCallId = setTimeout(missCallHandle, CALL_RING_TIME_LIMIT);

			return () => clearTimeout(timeoutMissCallId);
		},
		[inVideoCall, videoCallRecipientData, videoCallId, missCallHandle, handleOutgoingCall],
	);

	useEffect(() => {
		if (streams.peerStream && streamRef.current) {
			streamRef.current.srcObject = streams.peerStream;
		}
	}, [streams]);

	useEffect(() => {
		if (
			isEmpty(webrtcToken) || !peerRef.current
			|| webrtcToken?.token_for !== userId
		) {
			return;
		}

		try {
			peerRef.current?.signal?.(webrtcToken?.token);
		} catch (error) {
			console.error('not able to load signal', error);
		}
	}, [userId, webrtcToken]);

	if (callComing) {
		return (
			<IncomingCall
				rejectCall={rejectCall}
				answerCall={answerCall}
				callDetails={callDetails}
			/>
		);
	}

	if (inVideoCall) {
		return (
			<VideoCallScreen
				toggleState={toggleState}
				setToggleState={setToggleState}
				streams={streams}
				handleCallEnd={handleCallEnd}
				callDetails={callDetails}
				firestore={firestore}
				ref={streamRef}
			/>
		);
	}

	return null;
}

export default VideoCall;
