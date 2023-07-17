import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';

import CallComing from './CallComing';
import { firebaseConfig } from './configurations/firebase-config';
import useComingCall from './hooks/useComingCall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import VideoCallScreen from './VideoCallScreen';

function VideoCall({
	videoCallRecipientData = {},
	inVideoCall = false,
}) {
	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const [callComing, setCallComing] = useState(false);
	const [inACall, setInACall] = useState(false);
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
		user_stream   : null,
		peer_stream   : null,
		screen_stream : null,
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

	const { callingTo, callUpdate, callEnd, stopStream, saveWebrtcToken } = useVideoCallFirebase({
		firestore,
		setCallComing,
		callComing,
		setOptions,
		setWebrtcToken,
		setInACall,
		inACall,
		setCallDetails,
		callDetails,
		setStreams,
		streams,
		peerRef,
	});

	const { rejectOfCall, answerOfCall } = useComingCall({
		firestore,
		setCallDetails,
		callDetails,
		setInACall,
		setCallComing,
		callUpdate,
		setStreams,
		peerRef,
		saveWebrtcToken,
		setWebrtcToken,
		webrtcToken,
		callEnd,
	});

	useEffect(() => {
		if (inVideoCall) {
			callingTo(videoCallRecipientData);
		}
	}, [callingTo, inVideoCall, videoCallRecipientData]);

	useEffect(() => {
		if (streams.screen_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.screen_stream;
		} else if (streams.user_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.user_stream;
		}
		if (streams.peer_stream) {
			streamRef.current.peer.srcObject = streams.peer_stream;
		}
	}, [streams]);

	useEffect(() => {
		if (webrtcToken?.peer_token && callDetails?.calling_type === 'outgoing') {
			if (peerRef.current) {
				peerRef.current.signal(webrtcToken?.peer_token);
			}
		}
	}, [callDetails?.calling_type, webrtcToken?.peer_token]);

	console.log('stream', streams);

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
			{inACall ? (
				<VideoCallScreen
					ref={streamRef}
					options={options}
					setOptions={setOptions}
					setStreams={setStreams}
					streams={streams}
					callEnd={callEnd}
					stopStream={stopStream}
					callUpdate={callUpdate}
					peerRef={peerRef}
					callDetails={callDetails}
				/>
			) : null}
		</div>
	);
}

export default VideoCall;
