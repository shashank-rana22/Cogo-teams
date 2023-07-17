import { Avatar, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMMinus } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import useVideocallOptions from '../hooks/useVideocallOptions';

import styles from './styles.module.css';

const FIRST_VARIABLE = 1;

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
	const { calling_type, peer_details	} = callDetails || {};
	const { user_name = 'Unknown' } = peer_details || {};

	const { isMinimize } = options || {};

	const tempRef = ref;

	const { stopCall } = useVideocallOptions({
		options,
		setOptions,
		setStreams,
		streams,
		callEnd,
		stopStream,
		callUpdate,
		peerRef,
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
					<div>00: 33</div>
				</div>
				<div
					role="presentation"
					type="button"
					className={styles.hangup_icon}
					onClick={stopCall}
				>
					<IcMCall className={styles.end_call_icon} />
				</div>

			</div>
			<div className={styles.content}>
				<IcMMinus className={styles.minus_icon} onClick={handleMinimize} />
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
							On Call
							<span> 00:44</span>
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
		</div>
	);
}

export default forwardRef(VideoCallScreen);
