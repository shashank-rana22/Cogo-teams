import { useState } from 'react';

import CallModal from './CallModal';
import useFetchFirebaseRoom from './hooks/useFetchFirebase';
import IncomingCall from './IncomingCall';

const COMPONENT_MAPPING = {
	incoming : IncomingCall,
	ongoing  : CallModal,
};

function GroupCall({ firestore = {}, agentId = '' }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { videoCallDetails } = useFetchFirebaseRoom({ firestore, agentId });

	const showModalType = videoCallDetails?.video_call_status || '';

	const Comp = COMPONENT_MAPPING[showModalType] || null;

	if (!Object.keys(COMPONENT_MAPPING)?.includes(showModalType) || !Comp) {
		return null;
	}

	let meeting_link = '';

	if (showModalType === 'ongoing') {
		meeting_link = '';
	}

	// eslint-disable-next-line max-len
	// const MEETING_LINK = 'https://chatbot.dev.cogoport.io:3010/join/?meeting=U2FsdGVkX18C1pRPvzxm6VFmWwnRcCXZG293XITHgM46fFlCMA9QvFE7rqzQs3TUsIYIrP2QUVhIfnFuNqpkRH3qq5Jl%2Bh%2Fn3WLy3NmrbKwFSCtWLfRAfkqgUYO%2B2tmdWGQ50B17%2BV35H1nQ%2BUtBYH6lF7iyqe%2BxjkZnkFCMbjUsmUCBDlRC63oXuwAoTrPjVVE%2F8WeHBf1oN4gZAU9nCyiltnu1w0YOzYSHHEqf8K0%3D';

	return (
		<div>
			<Comp
				url={meeting_link}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
			/>
		</div>
	);
}

export default GroupCall;
