import { Button, Avatar } from '@cogoport/components';
import { IcMCall, IcMScreenShare } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';

import CallComing from './CallComing';
import { firebaseConfig } from './configurations/firebase-config';
import useComingCall from './hooks/useComingCall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import styles from './styles.module.css';
// import VideoCallScreen from './VideoCallScreen';

function VideoCall() {
	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);
	const peerRef = useRef(null);

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
		isMaximize          : false,
	});
	console.log(options, 'options');
	const streamRef = useRef({
		user : null,
		peer : null,
	});
	const componentsRef = useRef({
		call_comming : null,
		call_screen  : null,
	});

	// const { } = callDetails.calling_details || {};

	const { callingTo, callUpdate, callEnd, stopStream, saveWebrtcToken } = useVideoCallFirebase({
		firestore,
		setCallComing,
		setOptions,
		setWebrtcToken,
		callComing,
		setInACall,
		inACall,
		setCallDetails,
		callDetails,
		setStreams,
		streams,
		peerRef,
	});

	console.log(callEnd, stopStream, 'reihgiergnkj');

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
	});

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
		if (webrtcToken?.peer_token && callDetails?.calling_type === 'calling') {
			if (peerRef.current) {
				peerRef.current.signal(webrtcToken?.peer_token);
			}
		}
	}, [callDetails?.calling_type, webrtcToken?.peer_token]);

	const onDragHandler = (ev, moving_ref) => {
		const shiftX = ev.clientX;
		const shiftY = ev.clientY;
		const SHIFT = 50;

		if (shiftX && shiftY) {
			componentsRef[moving_ref].style = `top: ${shiftY - SHIFT}px;
			left: ${shiftX - SHIFT}px;`;
		}
	};

	return (
		<div>
			<div className={styles.call_comming}>
				<Button onClick={callingTo}>Call</Button>
			</div>
			{callComing ? (
				<div
					className={styles.call_comming}
					draggable="true"
					onDrag={(ev) => onDragHandler(ev, 'call_comming')}
					ref={(e) => {
						componentsRef.call_comming = e;
					}}
					onDragOver={(e) => e.preventDefault()}
				>
					<CallComing
						rejectOfCall={rejectOfCall}
						answerOfCall={answerOfCall}
					/>
				</div>
			) : null}
			{inACall ? (
				<div
					className={styles.container}
					draggable="true"
					onDrag={(ev) => onDragHandler(ev, 'call_screen')}
					ref={(e) => {
						componentsRef.call_screen = e;
					}}
					onDragOver={(e) => e.preventDefault()}
				>
					<div className={styles.header}>Purnendu Shekhar</div>
					<Avatar personName="Purnendu Shekhar" size="250px" className={styles.styled_avatar} />
					<div className={styles.footer}>
						<div className={styles.call_text}>
							On Call
							<span>00:44</span>
						</div>
						<div className={styles.image_container}>
							<IcMScreenShare className={styles.share_icon} />
							<div className={styles.hangup_icon}>
								<IcMCall className={styles.end_call_icon} />
							</div>
						</div>
					</div>
					{/*

								{streams && (
									<VideoCallScreen
										setStreams={setStreams}
										ref={streamRef}
										setOptions={setOptions}
										options={options}
										callEnd={callEnd}
										stopStream={stopStream}
										callUpdate={callUpdate}
									/>
								)}
							</div>
						</div>
						*/}
				</div>

			) : null}
		</div>
	);
}

export default VideoCall;
