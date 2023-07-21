import { Tooltip } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { useEffect } from 'react';

import getVideoControls from '../../../configurations/videoControls';
import { callUpdate } from '../../../utils/callFunctions';

import styles from './styles.module.css';

function CustomTootTipContent({ Icon = null, content = '' }) {
	if (!Icon) {
		return null;
	}

	return (
		<Tooltip
			interactive
			content={content}
			placement="bottom"
			theme="light"
		>
			<div className={styles.icon_div}>
				<Icon />
			</div>
		</Tooltip>
	);
}

function VideoCallOptions({
	firestore = {},
	callDetails = {},
	stopCall = () => {},
	options = {},
	setOptions = () => {},
	micOn = () => {},
	videoOn = () => {},
	callingDetails = {},
}) {
	const { isScreenShareActive = false, isMicActive = false, isVideoActive = false } = options || {};
	const { request_screen_share = false } = callingDetails || {};

	const handleRequestScreenShare = () => {
		callUpdate({
			data            : { request_screen_share: !request_screen_share },
			firestore,
			calling_room_id : callDetails?.calling_room_id,
		});
	};

	const controlMapping = getVideoControls({
		handleRequestScreenShare,
		isScreenShareActive,
		micOn,
		isMicActive,
		videoOn,
		isVideoActive,
	});

	useEffect(() => {
		setOptions((prev) => ({
			...prev,
			isScreenShareActive: request_screen_share,
		}));
	}, [request_screen_share, setOptions]);

	return (
		<>
			{controlMapping.map((itm) => {
				const { ActiveIcon, InactiveIcon, condition, activeContet, inActiveContent } = itm;

				return (
					<div
						role="presentation"
						key={itm.name}
						onClick={itm.clickFunc}
						className={styles.call_options_icons}
					>
						<CustomTootTipContent
							Icon={condition ? ActiveIcon : InactiveIcon}
							content={condition ? activeContet : inActiveContent}
						/>
					</div>
				);
			})}

			<div
				role="presentation"
				onClick={stopCall}
				className={styles.hangup_icon}
			>
				<IcMCall className={styles.end_call_icon} />
			</div>
		</>
	);
}

export default VideoCallOptions;
