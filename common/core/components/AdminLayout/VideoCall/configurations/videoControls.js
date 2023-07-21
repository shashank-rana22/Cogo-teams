import {
	IcMMicrophone,
	IcMScreenShare,
	IcMVideoCall,
	IcMStopShare,
	IcMVideoCallMute,
	IcMMicrophoneMute,
} from '@cogoport/icons-react';

const getVideoControls = ({
	handleRequestScreenShare = () => {},
	isScreenShareActive = false,
	micOn = () => {},
	isMicActive = false,
	videoOn = () => {},
	isVideoActive = false,
}) => [
	{
		name            : 'screen_share',
		clickFunc       : handleRequestScreenShare,
		condition       : isScreenShareActive,
		ActiveIcon      : IcMStopShare,
		InactiveIcon    : IcMScreenShare,
		activeContet    : 'Stop Request',
		inActiveContent : 'Request Screen Share',
	},
	{
		name            : 'mic_on',
		clickFunc       : micOn,
		condition       : isMicActive,
		ActiveIcon      : IcMMicrophone,
		InactiveIcon    : IcMMicrophoneMute,
		activeContet    : 'Mute',
		inActiveContent : 'Unmute',
	},
	{
		name            : 'video_on',
		clickFunc       : videoOn,
		condition       : isVideoActive,
		ActiveIcon      : IcMVideoCall,
		InactiveIcon    : IcMVideoCallMute,
		activeContet    : 'Turn off Camera',
		inActiveContent : 'Turn on camera',
	},
];

export default getVideoControls;
