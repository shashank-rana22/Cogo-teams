import {
	IcMCall,
	IcMMicrophone,
	IcMScreenShare,
	IcMVideoCall,
	IcMStopShare,
	IcMVideoCallMute,
	IcMMicrophoneMute,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

function VideoCallOptions({
	stopCall = () => {},
	shareScreen = () => {},
	options = null,
	// setOptions = () => {},
	micOn = () => {},
	videoOn = () => {},
}) {
	return (
		<>
			<div role="presentation" onClick={shareScreen} className={styles.call_options_icons}>
				{options?.isScreenShareActive ? <IcMStopShare /> : <IcMScreenShare />}
			</div>
			<div role="presentation" onClick={micOn} className={styles.call_options_icons}>
				{options?.isMicActive ? <IcMMicrophone /> : <IcMMicrophoneMute />}
			</div>
			<div role="presentation" onClick={videoOn} className={styles.call_options_icons}>
				{options?.isVideoActive ? <IcMVideoCall /> : <IcMVideoCallMute />}
			</div>
			<div role="presentation" onClick={stopCall} className={styles.hangup_icon}>
				<IcMCall className={styles.end_call_icon} />
			</div>
		</>
	);
}

export default VideoCallOptions;
