import { forwardRef } from 'react';

import styles from './styles.module.css';
import VideoCallOptions from './VideoCallOptions';

function VideoCallScreen({
	setInACall = () => {}, setStreams = () => {}, streams = null,
}, ref) {
	const tempRef = ref;

	const stopStream = (stream_type) => {
		if (!streams[stream_type]) return;

		const tracks = streams[stream_type].getTracks();
		tracks.forEach((track) => {
			track.stop();
		});
	};

	const CallEnd = () => {
		setInACall(false);
		stopStream('screen_stream');
		stopStream('user_stream');
	};

	const shareScreen = () => {
		navigator.mediaDevices
			.getDisplayMedia({ cursor: true })
			.then((screenStream) => {
				setStreams((prev) => ({ ...prev, screen_stream: screenStream }));
			})
			.catch((error) => {
				console.log('Failed to share screen', error);
			});
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
				<VideoCallOptions CallEnd={CallEnd} shareScreen={shareScreen} />
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
