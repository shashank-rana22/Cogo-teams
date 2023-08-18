import {
	IcMMicrophone,
	IcMScreenShare,
	IcMStopShare,
	IcMMicrophoneMute,
} from '@cogoport/icons-react';

const getVideoControls = ({
	handleRequestScreenShare = () => {},
	isScreenShareActive = false,
	toggleMic = () => {},
	isMicActive = false,
}) => [
	{
		name            : 'screen_share',
		clickFunc       : handleRequestScreenShare,
		isActive        : isScreenShareActive,
		ActiveIcon      : IcMStopShare,
		InactiveIcon    : IcMScreenShare,
		activeContet    : 'Stop Request',
		inActiveContent : 'Request Screen Share',
	},
	{
		name            : 'mic_on',
		clickFunc       : toggleMic,
		isActive        : isMicActive,
		ActiveIcon      : IcMMicrophone,
		InactiveIcon    : IcMMicrophoneMute,
		activeContet    : 'Mute',
		inActiveContent : 'Unmute',
	},
];

export default getVideoControls;
