import { IcMCall, IcMFitView, IcMMicrophone, IcMScreenShare, IcMVideoCall } from '@cogoport/icons-react';

function VideoCallOptions({ CallEnd = () => {}, shareScreen = () => {} }) {
	return (
		<>
			<div>
				<IcMFitView />
			</div>
			<div role="presentation" onClick={shareScreen}>
				<IcMScreenShare />
			</div>
			<div role="presentation" onClick={CallEnd}>
				<IcMCall />
			</div>
			<div>
				<IcMMicrophone />
			</div>
			<div>
				<IcMVideoCall />
			</div>

		</>
	);
}

export default VideoCallOptions;
