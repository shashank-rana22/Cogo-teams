const getConferenceText = ({ callState = {} }) => {
	const { mainAgentName = '', conferenceType = '', receiverUserDetails = {} } = callState || {};

	const { userName = '' } = receiverUserDetails || {};

	const CONFERENCE_TEXT = {
		monitor  : `${mainAgentName} has invited you to moniter the call with ${userName || 'user'}`,
		whisper  : `${mainAgentName} has invited you to whisper the call with ${userName || 'user'}`,
		barge    : `${mainAgentName} has invited you to conference call with ${userName || 'user'}`,
		transfer : `${mainAgentName} has invited you to take over the call with ${userName || 'user'}`,
	};

	return CONFERENCE_TEXT[conferenceType] || CONFERENCE_TEXT.barge;
};

export default getConferenceText;
