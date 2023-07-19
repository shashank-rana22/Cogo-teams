import { Tooltip } from '@cogoport/components';
import {
	IcMCall,
	IcMMicrophone,
	IcMScreenShare,
	IcMVideoCall,
	IcMStopShare,
	IcMVideoCallMute,
	IcMMicrophoneMute,
} from '@cogoport/icons-react';
import { useEffect } from 'react';

import styles from './styles.module.css';

function CustomTootTipContent({ icon = () => {}, content = '' }) {
	return (
		<Tooltip trigger="mouseenter" interactive content={content} placement="bottom" theme="light">
			<div className={styles.icon_div}>{icon}</div>
		</Tooltip>
	);
}

function VideoCallOptions({
	stopCall = () => {},
	// shareScreen = () => {},
	options = {},
	setOptions = () => {},
	micOn = () => {},
	videoOn = () => {},
	callingDetails = {},
	callUpdate = () => {},
}) {
	const { isScreenShareActive = false, isMicActive = false, isVideoActive = false } = options || {};
	const { request_screen_share = false } = callingDetails || {};

	const handleRequestScreenShare = () => {
		const data = ({
			request_screen_share: !request_screen_share,
		});
		callUpdate(data);
	};

	useEffect(() => {
		setOptions((prev) => ({ ...prev, isScreenShareActive: request_screen_share }));
	}, [request_screen_share, setOptions]);

	return (
		<>

			<div role="presentation" onClick={handleRequestScreenShare} className={styles.call_options_icons}>
				{isScreenShareActive
					? (
						<CustomTootTipContent
							icon={<IcMStopShare />}
							content="Stop Request"
						/>
					) : (
						<CustomTootTipContent
							icon={<IcMScreenShare />}
							content="Request Screen Share"
						/>
					)}
			</div>
			<div role="presentation" onClick={micOn} className={styles.call_options_icons}>
				{isMicActive
					? (
						<CustomTootTipContent
							icon={<IcMMicrophone />}
							content="Mute"
						/>
					) : (
						<CustomTootTipContent
							icon={<IcMMicrophoneMute />}
							content="UnMute"
						/>
					)}
			</div>
			<div role="presentation" onClick={videoOn} className={styles.call_options_icons}>
				{isVideoActive
					? (
						<CustomTootTipContent
							icon={<IcMVideoCall />}
							content="Turn off Camera"
						/>
					) : (
						<CustomTootTipContent
							icon={<IcMVideoCallMute />}
							content="Turn on camera"
						/>
					)}
			</div>
			<div role="presentation" onClick={stopCall} className={styles.hangup_icon}>
				<IcMCall className={styles.end_call_icon} />
			</div>
		</>
	);
}

export default VideoCallOptions;
