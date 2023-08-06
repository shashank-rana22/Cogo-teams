export const checkHangupStatus = ({ setCallState, openFeedbackform, timeoutId = '', unmountVoiceCall }) => {
	clearInterval(timeoutId);
	setCallState(((prev) => {
		const { receiverUserDetails, isSelfIntiated = false } = prev || {};
		const { user_id = '', organization_id = '' } = receiverUserDetails || {};

		if (!isSelfIntiated || (!user_id && !organization_id)) {
			unmountVoiceCall();
			return {};
		}

		openFeedbackform();
		return prev;
	}));
};
