import {
	IcMCall,
	IcMZoomIn,
	IcMMicrophone,
	IcMScreenShare,
	IcMVideoCall,
	IcMStopShare,
	IcMVideoCallMute,
	IcMMicrophoneMute,
	IcMZoomOut,
} from '@cogoport/icons-react';

function VideoCallOptions({
	callEnd = () => {},
	shareScreen = () => {},
	options = null,
	setOptions = () => {},
	micOn = () => {},
	videoOn = () => {},
}) {
	const maximizeScreen = () => {
		setOptions((prev) => ({ ...prev, isMaximize: !prev.isMaximize }));
	};

	return (
		<>
			<div role="presentation" onClick={maximizeScreen}>
				{options?.isMaximize ? <IcMZoomOut /> : <IcMZoomIn />}
			</div>
			<div role="presentation" onClick={shareScreen}>
				{options?.isScreenShareActive ? <IcMStopShare /> : <IcMScreenShare />}
			</div>
			<div role="presentation" onClick={callEnd}>
				<IcMCall />
			</div>
			<div role="presentation" onClick={micOn}>
				{options?.isMicActive ? <IcMMicrophone /> : <IcMMicrophoneMute />}
			</div>
			<div role="presentation" onClick={videoOn}>
				{options?.isVideoActive ? <IcMVideoCall /> : <IcMVideoCallMute />}
			</div>
		</>
	);
}

export default VideoCallOptions;
