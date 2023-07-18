import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall } from '@cogoport/icons-react';
import { forwardRef, useState } from 'react';

import useVideocallOptions from '../hooks/useVideocallOptions';

import styles from './styles.module.css';
import VideoCallTimer from './VideoCallTimer';

const FIRST_VARIABLE = 1;

function VideoCallScreen({
	options = {},
	setOptions = () => {},
	streams = {},
	callEnd = () => {},
	callUpdate = () => {},
	peerRef = null,
	callDetails = {},
}, ref) {
	const { peer_stream } = streams || {};
	const { calling_type, peer_details	} = callDetails || {};
	const { user_name = 'Unknown' } = peer_details || {};

	const [time, setTime] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const tempRef = ref;

	const { stopCall } = useVideocallOptions({
		options,
		setOptions,
		streams,
		callEnd,
		callUpdate,
		peerRef,
	});

	return (
		<div className={styles.container}>
			<div className={peer_stream ? styles.peer_screen : styles.call_screen}>
				<div className={styles.avatar_screen}>
					<div className={styles.header}>{user_name}</div>
					<Avatar
						personName={user_name.slice(GLOBAL_CONSTANTS.zeroth_index, FIRST_VARIABLE)}
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
				{peer_stream ? (
					<div className={styles.call_text}>
						<div>On Call</div>
						<VideoCallTimer peer_stream={streams?.peer_stream} time={time} setTime={setTime} />
					</div>
				) : (
					<div className={styles.call_text}>
						{calling_type === 'incoming' ? 'Conecting..' : 'Ringing...'}
					</div>
				)}

				<div className={styles.calling_options}>
					<div className={styles.hangup_icon} role="presentation" onClick={stopCall}>
						<IcMCall className={styles.end_call_icon} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(VideoCallScreen);
