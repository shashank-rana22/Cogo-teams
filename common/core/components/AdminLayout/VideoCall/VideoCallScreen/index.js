import { Avatar } from '@cogoport/components';
import { IcMCall, IcMScreenShare } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import useVideocallOptions from '../hooks/useVideocallOptions';

import styles from './styles.module.css';

function VideoCallScreen({
	options = {},
	setOptions = () => {},
	setStreams = () => {},
	streams = {},
	callEnd = () => {},
	stopStream = () => {},
	callUpdate = () => {},
	peerRef = null,
	callDetails = {},
}, ref) {
	const { peer_stream } = streams || {};
	const { calling_type } = callDetails || {};

	const tempRef = ref;

	const { shareScreen, stopCall } = useVideocallOptions({
		options,
		setOptions,
		setStreams,
		streams,
		callEnd,
		stopStream,
		callUpdate,
		peerRef,
	});

	return (
		<div className={styles.container}>
			<div className={peer_stream ? styles.peer_screen : styles.call_screen}>
				<div className={styles.avatar_screen}>
					<div className={styles.header}>Purnendu Shekhar</div>
					<Avatar personName="Purnendu Shekhar" size="250px" className={styles.styled_avatar} />
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
				{peer_stream ? (
					<div className={styles.call_text}>
						On Call
						<span> 00:44</span>
					</div>
				) : (
					<div className={styles.call_text}>
						{calling_type === 'incoming' ? 'Conecting..' : 'Ringing...'}
					</div>
				)}

				<div className={styles.calling_options}>
					{peer_stream ? (
						<div role="presentation" className={styles.share_icon} onClick={shareScreen}>
							<IcMScreenShare className={styles.end_call_icon} />
						</div>
					) : null }

					<div className={styles.hangup_icon} role="presentation" onClick={stopCall}>
						<IcMCall className={styles.end_call_icon} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
