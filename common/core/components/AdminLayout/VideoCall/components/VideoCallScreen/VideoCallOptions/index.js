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
	toggleState = {},
	setToggleState = () => {},
	toggleMic = () => {},
	callingRoomDetails = {},
	type = '',
	time = 0,
}) {
	const { isScreenShareActive = false, isMicActive = false } = toggleState || {};
	const { request_screen_share: requestScreenShare = false } = callingRoomDetails || {};

	const handleRequestScreenShare = ({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		callUpdate({
			data          : { request_screen_share: !requestScreenShare },
			firestore,
			callingRoomId : callDetails?.callingRoomId,
		});
	};

	const controlMapping = getVideoControls({
		handleRequestScreenShare,
		isScreenShareActive,
		toggleMic,
		isMicActive,
	});

	useEffect(() => {
		setToggleState((prev) => ({
			...prev,
			isScreenShareActive: requestScreenShare,
		}));
	}, [requestScreenShare, setToggleState]);

	return (
		<>
			{controlMapping.map((itm) => {
				const {
					ActiveIcon,
					InactiveIcon,
					name,
					isActive,
					clickFunc,
					activeContet,
					inActiveContent,
				} = itm;

				return (
					<div
						role="presentation"
						key={name}
						onClick={(e) => clickFunc({ e, clickType: type })}
						className={styles.call_options_icons}
					>
						<CustomTootTipContent
							Icon={isActive ? ActiveIcon : InactiveIcon}
							content={isActive ? activeContet : inActiveContent}
						/>
					</div>
				);
			})}

			<div
				role="presentation"
				onClick={(e) => stopCall({ e, clickType: type, time })}
				className={styles.hangup_icon}
			>
				<IcMCall className={styles.end_call_icon} />
			</div>
		</>
	);
}

export default VideoCallOptions;
