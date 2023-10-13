export const checkHangupStatus = ({
	setCallState = () => {},
	openFeedbackform = () => {}, timeoutId = '', unmountVoiceCall, feedbackFormStatus = '',
}) => {
	clearInterval(timeoutId);
	setCallState(((prev) => {
		const {
			receiverUserDetails,
			isSelfIntiated = false, callStartAt = '',
			lead_organization_id: outerLeadOrg = '',
			callRecordId = '',
		} = prev || {};
		const {
			user_id = '',
			organization_id = '',
			lead_organization_id = '',
			lead_user_id = '',
		} = receiverUserDetails || {};

		const showFeedbackForm = feedbackFormStatus === 'pending';

		if (!isSelfIntiated || !user_id || !organization_id) {
			unmountVoiceCall({
				lead_organization_id: outerLeadOrg || lead_organization_id,
				lead_user_id,
				callStartAt,
				callRecordId,
				showFeedbackForm,
			});
			return {};
		}

		openFeedbackform({ showFeedbackForm });

		return prev;
	}));
};
