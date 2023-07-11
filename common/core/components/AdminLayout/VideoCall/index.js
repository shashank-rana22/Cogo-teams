import React, { useState, useRef, useEffect } from 'react';

import CallComming from './CallComming';
import styles from './styles.module.css';
import VideoCallScreen from './VideoCallScreen';

function VideoCall() {
	const [show, setShow] = useState(false);
	const [callComming, setCallComming] = useState(true);
	const [inACall, setInACall] = useState(false);

	const [streams, setStreams] = useState(
		{
			user_stream : null,
			peer_stream : null,
		},
	);

	const streamRef = useRef({ user: null, peer: null });
	const componentsRef = useRef({ call_comming: null, call_screen: null });

	const localStream = useRef(null);

	useEffect(() => {
		if (streams.user_stream) {
			streamRef.current.user.srcObject = streams.user_stream;
		}
		if (streams.peer_stream) {
			streamRef.current.peer.srcObject = streams.peer_stream;
		}
	}, [streams]);

	function onDragHandler(ev, moving_ref) {
		const shiftX = ev.clientX;
		const shiftY = ev.clientY;
		const SHIFT = 50;

		if (shiftX && shiftY) {
			componentsRef[moving_ref].style = `top: ${shiftY - SHIFT}px;left: ${shiftX - SHIFT}px;`;
		}
	}

	return (
		<div>
			{callComming ? (
				<div
					className={styles.call_comming}
					draggable="true"
					onDrag={(ev) => onDragHandler(ev, 'call_comming')}
					ref={(e) => { componentsRef.call_comming = e; }}
					onDragOver={(e) => e.preventDefault()}
				>
					<CallComming
						setCallComming={setCallComming}
						setInACall={setInACall}
						setStreams={setStreams}
						localStream={localStream}
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
						ref={(e) => { componentsRef.call_screen = e; }}
						onClick={() => { setShow(!show); }}
						onDragOver={(e) => e.preventDefault()}
					>
						{streams && (
							<VideoCallScreen
								setInACall={setInACall}
								localStream={localStream}
								setStreams={setStreams}
								ref={streamRef}
							/>
						)}
					</div>
				</div>
			) : null}

		</div>
	);
}

export default VideoCall;
