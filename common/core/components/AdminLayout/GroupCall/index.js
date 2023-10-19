import CallModal from './CallModal';
import useFetchFirebaseRoom from './hooks/useFetchFirebase';
import useGetVideoConferenceLink from './hooks/useGetVideoConferenceLink';
import IncomingCall from './IncomingCall';

const COMPONENT_MAPPING = {
	incoming : IncomingCall,
	ongoing  : CallModal,
};

function GroupCall({ firestore = {}, agentId = '' }) {
	const { videoCallDetails } = useFetchFirebaseRoom({ firestore, agentId });

	const { meeting_id: meetingId = '', video_call_status: showModalType = '' } = videoCallDetails || {};

	const Comp = COMPONENT_MAPPING[showModalType] || null;

	const { meeting_link } = useGetVideoConferenceLink({ meetingId, showModalType });

	if (!Object.keys(COMPONENT_MAPPING)?.includes(showModalType) || !Comp) {
		return null;
	}

	const PROPS_MAPPING = {
		incoming : {},
		ongoing  : { url: meeting_link },
	};

	return (
		<Comp
			key={showModalType}
			{...(PROPS_MAPPING[showModalType] || {})}
		/>
	);
}

export default GroupCall;
