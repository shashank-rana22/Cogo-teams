export const checkHangupStatus = ({ setCallState, openFeedbackform, timeoutId = '', unmountVoiceCall }) => {
	clearInterval(timeoutId);
	setCallState(((prev) => {
		const { receiverUserDetails, isSelfIntiated = false } = prev || {};
		const {
			user_id = '',
			organization_id = '',
			lead_organization_id = '',
			lead_user_id = '',
		} = receiverUserDetails || {};

		if (!isSelfIntiated || !user_id || !organization_id) {
			unmountVoiceCall({ lead_organization_id, lead_user_id });
			return {};
		}

		openFeedbackform();
		return prev;
	}));
};
