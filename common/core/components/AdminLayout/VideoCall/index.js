import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import IncomingCall from './components/IncomingCall';
import VideoCallScreen from './components/VideoCallScreen';
import { FIREBASE_CONFIG } from './configurations/firebase-config';
import { CALL_RING_TIME_LIMIT } from './constants';
import useComingCall from './hooks/useComingCall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import { callUpdate } from './utils/callFunctions';

function VideoCall({
	videoCallRecipientData = {},
	inVideoCall = false,
}) {
	const streamRef = useRef(null);
	const peerRef = useRef(null);

	const [callComing, setCallComing] = useState(false);
	const [webrtcToken, setWebrtcToken] = useState({
		userToken : {},
		peerToken : {},
	});
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

	const { handleOutgoingCall, handleCallEnd } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setCallDetails,
		setWebrtcToken,
		setToggleState,
		callDetails,
		setStreams,
		peerRef,
	});

	const { rejectCall, answerCall } = useComingCall({
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
				callingRoomId : callDetails?.callingRoomId,
			});
			handleCallEnd();
		}
	}, [callDetails?.callingRoomId, callDetails?.callingRoomDetails?.call_status, handleCallEnd, firestore]);

	useEffect(
		() => {
			if (inVideoCall && videoCallRecipientData?.user_id) {
				handleOutgoingCall(videoCallRecipientData);
			}

			const timeoutMissCallId = setTimeout(missCallHandle, CALL_RING_TIME_LIMIT);

			return () => clearTimeout(timeoutMissCallId);
		},
		[inVideoCall, videoCallRecipientData, handleOutgoingCall, missCallHandle],
	);

	useEffect(() => {
		if (streams.peerStream && streamRef.current) {
			streamRef.current.srcObject = streams.peerStream;
		}
	}, [streams]);

	useEffect(() => {
		if (
			webrtcToken?.peerToken
			&& callDetails?.callingType === 'outgoing'
			&& peerRef.current
		) {
			try {
				peerRef.current?.signal?.(webrtcToken?.peerToken);
			} catch (error) {
				console.error('not able to load signal', error);
			}
		}
	}, [callDetails?.callingType, webrtcToken?.peerToken]);

	return (
		<div>
			{callComing ? (
				<IncomingCall
					rejectCall={rejectCall}
					answerCall={answerCall}
					callDetails={callDetails}
				/>
			) : null}
			{inVideoCall ? (
				<VideoCallScreen
					toggleState={toggleState}
					setToggleState={setToggleState}
					streams={streams}
					handleCallEnd={handleCallEnd}
					callDetails={callDetails}
					firestore={firestore}
					ref={streamRef}
				/>
			) : null}
		</div>
	);
}

export default VideoCall;
