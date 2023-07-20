import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import CallComing from './CallComing';
import { firebaseConfig } from './configurations/firebase-config';
import useComingCall from './hooks/useComingCall';
import { useSetInACall } from './hooks/useSetInACall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import { callUpdate } from './utils';
import VideoCallScreen from './VideoCallScreen';

const CALL_TIME_LIMIT = 60000;

function VideoCall({
	videoCallRecipientData = {},
	inVideoCall = false,
}) {
	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const [callComing, setCallComing] = useState(false);
	const [webrtcToken, setWebrtcToken] = useState({
		user_token : null,
		peer_token : null,
	});
	const [callDetails, setCallDetails] = useState({
		my_details           : null, // agent_details
		peer_details         : null, // video connected to the person
		calling_details      : null, // room_details
		calling_room_id      : null, // room_id
		webrtc_token_room_id : null,
		calling_type         : null, // incoming or outgoing
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

	const streamRef = useRef({
		user : null,
		peer : null,
	});
	const peerRef = useRef(null);

	const { setInACall } = useSetInACall();

	const { callingTo, callEnd } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setInACall,
		setCallDetails,
		setWebrtcToken,
		setOptions,
		callDetails,
		setStreams,
		peerRef,
	});

	const { rejectOfCall, answerOfCall } = useComingCall({
		firestore,
		setCallDetails,
		callDetails,
		setInACall,
		inVideoCall,
		setCallComing,
		setStreams,
		peerRef,
		webrtcToken,
		setWebrtcToken,
		callEnd,
	});

	const missCallHandel = useCallback(() => {
		callUpdate({
			data: {
				call_status: 'miss_call',
			},
			firestore,
			calling_room_id: callDetails?.calling_room_id,
		});
	}, [callDetails?.calling_room_id, firestore]);

	useEffect(() => {
		if (inVideoCall && videoCallRecipientData?.user_id) {
			callingTo(videoCallRecipientData);
		}
		const r = setTimeout(() => {
			if (callDetails?.call_status === 'calling') {
				missCallHandel();
				callEnd();
			}
		}, CALL_TIME_LIMIT);

		return () => clearTimeout(r);
	}, [videoCallRecipientData, inVideoCall, callingTo, callEnd, missCallHandel, callDetails?.call_status]);

	useEffect(() => {
		if (streams.screen_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.screen_stream;
		} else if (streams.user_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.user_stream;
		}
		if (streams.peer_stream && streamRef.current.peer) {
			streamRef.current.peer.srcObject = streams.peer_stream;
		}
	}, [streams]);

	useEffect(() => {
		if (webrtcToken?.peer_token && callDetails?.calling_type === 'outgoing') {
			if (peerRef.current) {
				try {
					peerRef.current.signal(webrtcToken?.peer_token);
				} catch (error) {
					console.log('not able to load signal', error);
				}
			}
		}
	}, [callDetails?.calling_type, webrtcToken?.peer_token]);

	return (
		<div>
			{callComing ? (
				<div>
					<CallComing
						rejectOfCall={rejectOfCall}
						answerOfCall={answerOfCall}
						callDetails={callDetails}
					/>
				</div>
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
