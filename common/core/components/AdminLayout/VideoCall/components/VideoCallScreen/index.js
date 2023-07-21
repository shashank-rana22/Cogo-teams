import { Avatar, cl } from '@cogoport/components';
import { IcMMinus } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import useVideocallOptions from '../../hooks/useVideocallOptions';

import styles from './styles.module.css';
import VideoCallOptions from './VideoCallOptions';
import VideoCallTimer from './VideoCallTimer';

function VideoCallScreen({
	options = {},
	setOptions = () => {},
	streams = {},
	callEnd = () => {},
	callDetails = {},
	firestore = {},
}, ref) {
	const { calling_type, peer_details, my_details, calling_details = {} } = callDetails || {};
	const {
		my_details: room_my_details = {},
		peer_details: room_peer_details = {},
		user_call_options = {},
	} = calling_details || {};
	const { isVideoActive = false, isScreenShareActive = false } = user_call_options || {};
	const { isMinimize } = options || {};

	const tempRef = ref;

	const getUserName = () => {
		if (calling_type === 'outgoing') {
			return peer_details?.user_name || room_peer_details?.user_name || 'Unknown user';
		}

		return my_details?.user_name || room_my_details?.user_name || 'Unknown user';
	};

	const { stopCall, shareScreen, micOn, videoOn } = useVideocallOptions({
		options,
		setOptions,
		streams,
		callEnd,
		callDetails,
		firestore,
	});

	const handleMinimize = () => {
		setOptions((prev) => ({ ...prev, isMinimize: true }));
	};

	return (
		<div className={cl`${!isMinimize ? styles.container : styles.minimize_container}`}>
			<div
				role="presentation"
				type="button"
				className={isMinimize ? styles.minimize_video_call : styles.hide_container}
				onClick={() => setOptions((prev) => ({ ...prev, isMinimize: false }))}
			>
				<div className={styles.timer}>
					<VideoCallTimer callingDetails={calling_details} />
				</div>
				<div className={styles.calling_options}>
					<VideoCallOptions
						firestore={firestore}
						callDetails={callDetails}
						stopCall={stopCall}
						shareScreen={shareScreen}
						options={options}
						setOptions={setOptions}
						micOn={micOn}
						videoOn={videoOn}
						callingDetails={calling_details}
						type="mini_screen"
					/>
				</div>
			</div>
			<div className={!isMinimize ? styles.content : styles.hide_container}>
				<IcMMinus className={styles.minus_icon} onClick={handleMinimize} />
				<div className={(isVideoActive || isScreenShareActive)
					? styles.peer_screen : styles.call_screen}
				>
					<div
						className={(isVideoActive || isScreenShareActive)
							? styles.hide_container : styles.avatar_screen}
					>
						<div className={styles.header}>{getUserName()}</div>
						<Avatar
							personName={getUserName()}
							size="250px"
							className={styles.styled_avatar}
						/>
					</div>
					<div className={(isVideoActive || isScreenShareActive)
						? styles.peer_video_stream : styles.hide_container}
					>
						<video
							ref={(e) => {
								tempRef.current = e;
							}}
							autoPlay
						/>
					</div>
				</div>
				<div className={styles.footer}>
					{streams.peer_stream ? (
						<div className={styles.call_text}>
							On Call
							<VideoCallTimer callingDetails={calling_details} />
						</div>
					) : (
						<div className={styles.call_text}>
							{calling_type === 'incoming' ? 'Conecting...' : 'Ringing...'}
						</div>
					)}

					<div className={styles.calling_options}>
						<VideoCallOptions
							firestore={firestore}
							callDetails={callDetails}
							stopCall={stopCall}
							shareScreen={shareScreen}
							options={options}
							setOptions={setOptions}
							micOn={micOn}
							videoOn={videoOn}
							callingDetails={calling_details}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
