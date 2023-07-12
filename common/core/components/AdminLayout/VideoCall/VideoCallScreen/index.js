import { forwardRef } from 'react';

import styles from './styles.module.css';
import VideoCallOptions from './VideoCallOptions';

function VideoCallScreen({
	setInACall = () => {}, setStreams = () => {}, streams = null, setOptions = () => {}, options = {},
}, ref) {
	const tempRef = ref;

	const stopStream = (stream_type) => {
		if (!streams[stream_type]) return;

		const tracks = streams[stream_type].getTracks();
		tracks.forEach((track) => {
			track.stop();
		});
	};

	const callEnd = () => {
		setInACall(false);
		stopStream('screen_stream');
		stopStream('user_stream');
	};

	const shareScreen = () => {
		if (options.isScreenShareActive) {
			setOptions((prev) => ({ ...prev, isScreenShareActive: false }));
			setStreams((prev) => ({ ...prev, screen_stream: null }));
			stopStream('screen_stream');
		} else {
			navigator.mediaDevices
				.getDisplayMedia({ cursor: true })
				.then((screenStream) => {
					setOptions((prev) => ({ ...prev, isScreenShareActive: true }));
					setStreams((prev) => ({ ...prev, screen_stream: screenStream }));
				})
				.catch((error) => {
					console.log('Failed to share screen', error);
				});
		}
	};

	const micOn = () => {
		if (options.isMicActive) {
			setOptions((prev) => ({ ...prev, isMicActive: false }));
		} else {
			setOptions((prev) => ({ ...prev, isMicActive: true }));
		}
	};

	const videoOn = () => {
		if (options.isVideoActive) {
			setOptions((prev) => ({ ...prev, isVideoActive: false }));
		} else {
			setOptions((prev) => ({ ...prev, isVideoActive: true }));
		}
	};

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
