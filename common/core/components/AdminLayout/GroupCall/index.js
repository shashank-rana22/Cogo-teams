import { dynamic } from '@cogoport/next';

import useFetchFirebaseRoom from './hooks/useFetchFirebase';

const IncomingCall = dynamic(() => import('./IncomingCall'));

function GroupCall({ firestore = {}, agentId = '' }) {
	const { videoCallDetails } = useFetchFirebaseRoom({ firestore, agentId });

	const { video_call_status = '' } = videoCallDetails || {};

	if (video_call_status !== 'incoming') {
		return null;
	}

	return (
		<IncomingCall
			videoCallDetails={videoCallDetails}
		/>
	);
}

export default GroupCall;
