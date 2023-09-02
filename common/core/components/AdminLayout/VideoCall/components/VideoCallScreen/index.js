import { Avatar } from '@cogoport/components';
import { IcMMinus } from '@cogoport/icons-react';
import { forwardRef, useState } from 'react';

import useVideocallOptions from '../../hooks/useVideocallOptions';

import styles from './styles.module.css';
import VideoCallOptions from './VideoCallOptions';
import VideoCallTimer from './VideoCallTimer';

const INIT_TIME_ZERO = 0;

function VideoCallScreen({
	toggleState = {},
	setToggleState = () => {},
	streams = {},
	handleCallEnd = () => {},
	callDetails = {},
	firestore = {},
}, ref) {
	const tempRef = ref;

	const [time, setTime] = useState(INIT_TIME_ZERO);

	const {
		callingType,
		peerDetails = {},
		myDetails = {},
		callingRoomDetails = {},
	} = callDetails || {};

	const {
		my_details: roomMyDetails = {},
		peer_details: roomPeerDetails = {},
		user_call_options: userCallOptions = {},
	} = callingRoomDetails || {};

	const {
		is_video_active: isVideoActive = false,
		is_screen_share_active: isScreenShareActive = false,
	} = userCallOptions || {};

	const { isMinimize } = toggleState || {};

	const { stopCall, shareScreen, toggleMic } = useVideocallOptions({
		toggleState,
		setToggleState,
		streams,
		handleCallEnd,
		callDetails,
		firestore,
	});

	const getUserName = () => {
		if (callingType === 'outgoing') {
			return peerDetails?.user_name || roomPeerDetails?.user_name || 'Unknown user';
		}

		return myDetails?.user_name || roomMyDetails?.user_name || 'Unknown user';
	};

	const avaterUserName = getUserName();

	const handleMinimize = () => {
		setToggleState((prev) => ({ ...prev, isMinimize: true }));
	};

	return (
		<div className={!isMinimize ? styles.container : styles.minimize_container}>
			<div
				role="presentation"
				type="button"
				className={isMinimize ? styles.minimize_video_call : styles.hide_container}
				onClick={() => setToggleState((prev) => ({ ...prev, isMinimize: false }))}
			>
				<div className={styles.timer}>
					<VideoCallTimer callingRoomDetails={callingRoomDetails} time={time} setTime={setTime} />
				</div>
				<div className={styles.calling_options}>
					<VideoCallOptions
						firestore={firestore}
						callDetails={callDetails}
						stopCall={stopCall}
						shareScreen={shareScreen}
						toggleState={toggleState}
						setToggleState={setToggleState}
						toggleMic={toggleMic}
						callingRoomDetails={callingRoomDetails}
						type="mini_screen"
					/>
				</div>
			</div>
			<div className={!isMinimize ? styles.content : styles.hide_container}>
				<IcMMinus className={styles.minus_icon} onClick={handleMinimize} />
				<div className={styles.call_screen}>
					<div
						className={(isVideoActive || isScreenShareActive)
							? styles.hide_container : styles.avatar_screen}
					>
						<div className={styles.header}>{avaterUserName}</div>
						<Avatar
							personName={avaterUserName}
							size="250px"
							className={styles.styled_avatar}
						/>
					</div>
					<div className={(isVideoActive || isScreenShareActive)
						? styles.peer_video_stream : styles.hide_container}
					>
						<video
							ref={tempRef}
							autoPlay
						/>
					</div>
				</div>
				<div className={styles.footer}>
					{streams.peerStream ? (
						<div className={styles.call_text}>
							On Call
							<VideoCallTimer callingRoomDetails={callingRoomDetails} time={time} setTime={setTime} />
						</div>
					) : (
						<div className={styles.call_text}>
							{callingType === 'incoming' ? 'Connecting...' : 'Ringing...'}
						</div>
					)}

					<div className={styles.calling_options}>
						<VideoCallOptions
							firestore={firestore}
							callDetails={callDetails}
							stopCall={stopCall}
							shareScreen={shareScreen}
							toggleState={toggleState}
							setToggleState={setToggleState}
							toggleMic={toggleMic}
							callingRoomDetails={callingRoomDetails}
							time={time}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
