import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';

import CallComming from './CallComming';
import { firebaseConfig } from './configurations/firebase-config';
import useCommingCall from './hooks/useCommingCall';
import useVideoCallFirebase from './hooks/useVideoCallFirebase';
import styles from './styles.module.css';
import VideoCallScreen from './VideoCallScreen';

function VideoCall() {
	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);
	const peerRef = useRef(null);

	const [callComming, setCallComming] = useState(false);
	const [inACall, setInACall] = useState(false);
	const [callDetails, setCallDetails] = useState({
		my_details      : null,
		peer_details    : null,
		calling_details : null,
		calling_room_id : null,
		token_room_id   : null,
	});
	const [streams, setStreams] = useState({
		user_stream   : null,
		peer_stream   : null,
		screen_stream : null,
	});
	const [options, setOptions] = useState({
		isMicActive         : true,
		isVideoActive       : false,
		isScreenShareActive : false,
		isMaximize          : false,
	});

	const streamRef = useRef({
		user : null,
		peer : null,
	});
	const componentsRef = useRef({
		call_comming : null,
		call_screen  : null,
	});

	const { callingTo, callUpdate, callEnd, stopStream, saveWebrtcToken } = useVideoCallFirebase({
		firestore,
		setCallComming,
		callComming,
		setInACall,
		inACall,
		setCallDetails,
		callDetails,
		setStreams,
		streams,
		peerRef,
	});
	const { rejectOfCall, answerOfCall } = useCommingCall({
		firestore,
		setCallDetails,
		callDetails,
		setInACall,
		setCallComming,
		callUpdate,
		setStreams,
		peerRef,
		saveWebrtcToken,
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

	const onDragHandler = (ev, moving_ref) => {
		const shiftX = ev.clientX;
		const shiftY = ev.clientY;
		const SHIFT = 50;

		if (shiftX && shiftY) {
			componentsRef[moving_ref].style = `top: ${shiftY - SHIFT}px;left: ${
				shiftX - SHIFT
			}px;`;
		}
	};

	console.log(inACall, 'inACall');

	return (
		<div>
			<div className={styles.call_comming}>
				<Button onClick={callingTo}>Call</Button>
			</div>
			{callComming ? (
				<div
					className={styles.call_comming}
					draggable="true"
					onDrag={(ev) => onDragHandler(ev, 'call_comming')}
					ref={(e) => {
						componentsRef.call_comming = e;
					}}
					onDragOver={(e) => e.preventDefault()}
				>
					<CallComming
						rejectOfCall={rejectOfCall}
						answerOfCall={answerOfCall}
					/>
				</div>
			) : null}
			{inACall ? (
				<div draggable="false">
					<div
						className={styles.video_call_screen}
						role="presentation"
						draggable="true"
						onDrag={(ev) => onDragHandler(ev, 'call_screen')}
						ref={(e) => {
							componentsRef.call_screen = e;
						}}
						onDragOver={(e) => e.preventDefault()}
					>
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
			) : null}
		</div>
	);
}

export default VideoCall;
