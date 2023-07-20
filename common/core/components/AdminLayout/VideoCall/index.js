import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';

import CallComing from './CallComing';
import { firebaseConfig } from './configurations/firebase-config';
import useComingCall from './hooks/useComingCall';
import { useSetInACall } from './hooks/useSetInACall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import VideoCallScreen from './VideoCallScreen';

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

	const { callingTo, callUpdate, callEnd, saveWebrtcToken } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setOptions,
		setWebrtcToken,
		setInACall,
		inVideoCall,
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
		if (inVideoCall === true && videoCallRecipientData?.user_id) {
			callingTo(videoCallRecipientData);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoCallRecipientData, inVideoCall]);

	useEffect(() => {
		if (streams.screen_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.screen_stream;
		} else if (streams.user_stream && streamRef.current.user) {
			streamRef.current.user.srcObject = streams.user_stream;
		}
		if (streams.peer_stream && streamRef.current.peer) {
			streamRef.current.peer.srcObject = streams.peer_stream;
			const tracks = streams.peer_stream.getTracks();
			tracks.forEach((track) => {
				console.log(track);
			});
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
					ref={streamRef}
					options={options}
					setOptions={setOptions}
					streams={streams}
					setStreams={setStreams}
					callEnd={callEnd}
					callUpdate={callUpdate}
					peerRef={peerRef}
					callDetails={callDetails}
				/>
			) : null}
		</div>
	);
}

export default VideoCall;
