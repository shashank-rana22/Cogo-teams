import { useState } from 'react';

import CallModal from './CallModal';
import useFetchFirebaseRoom from './hooks/useFetchFirebase';
import useGetVideoConferenceLink from './hooks/useGetVideoConferenceLink';
import IncomingCall from './IncomingCall';

const COMPONENT_MAPPING = {
	incoming : IncomingCall,
	ongoing  : CallModal,
};

function GroupCall({ firestore = {}, agentId = '' }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { videoCallDetails } = useFetchFirebaseRoom({ firestore, agentId });

	const { meeting_id } = videoCallDetails || {};

	const showModalType = videoCallDetails?.video_call_status || '';

	const Comp = COMPONENT_MAPPING[showModalType] || null;

	const { meeting_link } = useGetVideoConferenceLink({ meeting_id, showModalType });

	if (!Object.keys(COMPONENT_MAPPING)?.includes(showModalType) || !Comp) {
		return null;
	}

	return (
		<div>
			<Comp
				url={meeting_link}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				videoCallDetails={videoCallDetails}
			/>
		</div>
	);
}

export default GroupCall;
