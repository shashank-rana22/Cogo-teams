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
	const app = isEmpty(getApps()) ? initializeApp(FIREBASE_CONFIG) : getApp();
	const firestore = getFirestore(app);

	const [callComing, setCallComing] = useState(false);
	const [webrtcToken, setWebrtcToken] = useState({
		user_token : null,
		peer_token : null,
	});
	const [callDetails, setCallDetails] = useState({
		my_details           : null,
		peer_details         : null,
		calling_details      : null,
		calling_room_id      : null,
		webrtc_token_room_id : null,
		calling_type         : null,
	});
	const [streams, setStreams] = useState({
		user_stream  : null,
		video_stream : null,
		peer_stream  : null,
	});
	const [options, setOptions] = useState({
		isMicActive         : true,
		isVideoActive       : true,
		isScreenShareActive : false,
		isMinimize          : false,
	});

	const streamRef = useRef(null);
	const peerRef = useRef(null);

	const { callingTo, callEnd } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setCallDetails,
		setWebrtcToken,
		setOptions,
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
		callEnd,
	});

	const missCallHandle = useCallback(() => {
		if (callDetails?.calling_details?.call_status === 'calling') {
			callUpdate({
				data            : { call_status: 'miss_call' },
				firestore,
				calling_room_id : callDetails?.calling_room_id,
			});
			callEnd();
		}
	}, [callDetails?.calling_room_id, callDetails?.calling_details?.call_status, callEnd, firestore]);

	useEffect(
		() => {
			if (inVideoCall && videoCallRecipientData?.user_id) {
				callingTo(videoCallRecipientData);
			}

			const timeoutFunc = setTimeout(missCallHandle, CALL_RING_TIME_LIMIT);

			return () => clearTimeout(timeoutFunc);
		},
		[inVideoCall, videoCallRecipientData, callingTo, missCallHandle],
	);

	useEffect(() => {
		if (streams.peer_stream && streamRef.current) {
			streamRef.current.srcObject = streams.peer_stream;
		}
	}, [streams]);

	useEffect(() => {
		if (
			webrtcToken?.peer_token
			&& callDetails?.calling_type === 'outgoing'
			&& peerRef.current
		) {
			try {
				peerRef.current?.signal?.(webrtcToken?.peer_token);
			} catch (error) {
				console.error('not able to load signal', error);
			}
		}
	}, [callDetails?.calling_type, webrtcToken?.peer_token]);

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
					options={options}
					setOptions={setOptions}
					streams={streams}
					callEnd={callEnd}
					callDetails={callDetails}
					firestore={firestore}
					ref={streamRef}
				/>
			) : null}
		</div>
	);
}

export default VideoCall;
