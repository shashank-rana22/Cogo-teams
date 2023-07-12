import { forwardRef } from 'react';

import useVideocallOptions from '../hooks/useVideocallOptions';

import styles from './styles.module.css';
import VideoCallOptions from './VideoCallOptions';

function VideoCallScreen({
	setInACall = () => {}, setStreams = () => {}, streams = null, setOptions = () => {}, options = {},
}, ref) {
	const tempRef = ref;
	const {
		videoOn, micOn,
		shareScreen, callEnd,
	} = useVideocallOptions({ streams, setInACall, options, setOptions, setStreams });

	return (
		<div className={styles.screen_div}>
			<div className={styles.peer_screen}>
				<video muted ref={(e) => { tempRef.current.peer = e; }} autoPlay />
			</div>
			<div className={styles.my_screen}>
				<video muted ref={(e) => { tempRef.current.user = e; }} autoPlay />
			</div>
			<div className={styles.video_call_option}>
				<VideoCallOptions
					CallEnd={callEnd}
					shareScreen={shareScreen}
					options={options}
					setOptions={setOptions}
					micOn={micOn}
					videoOn={videoOn}
				/>
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
