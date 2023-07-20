import { Avatar, cl } from '@cogoport/components';
import { IcMMinus } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import useVideocallOptions from '../hooks/useVideocallOptions';

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
	const { calling_type, peer_details, calling_details = {} } = callDetails || {};
	const { user_name = 'Unknown' } = peer_details || {};
	const { isVideoActive = false, isScreenShareActive = false } = calling_details?.user_call_options || {};

	const { isMinimize } = options || {};

	const tempRef = ref;

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
				className={styles.minimize_video_call}
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
					/>
				</div>
			</div>
			<div className={styles.content}>
				<IcMMinus className={styles.minus_icon} onClick={handleMinimize} />
				<div className={(isVideoActive || isScreenShareActive) ? styles.peer_screen : styles.call_screen}>
					<div className={styles.avatar_screen}>
						<div className={styles.header}>{user_name}</div>
						<Avatar
							personName={user_name}
							size="250px"
							className={styles.styled_avatar}
						/>
					</div>
					<div className={styles.peer_video_stream}>
						<video
							ref={(e) => {
								tempRef.current.peer = e;
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
							{calling_type === 'incoming' ? 'Conecting..' : 'Ringing...'}
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
