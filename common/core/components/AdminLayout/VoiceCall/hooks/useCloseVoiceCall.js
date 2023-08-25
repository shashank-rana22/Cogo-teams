import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

const useCloseVoiceCall = ({
	setCallState,
}) => {
	const dispatch = useDispatch();

	const unmountVoiceCall = useCallback(({ lead_user_id = '', lead_organization_id = '' } = {}) => {
		setCallState({});

		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
				lead_feedback_form_type   : lead_organization_id ? 'log_call_activity' : '',
				lead_feedback_form_data   : {
					lead_user_id,
					lead_organization_id,
					refetch_list: false,
				},
			}),
		);
	}, [dispatch, setCallState]);

	const openFeedbackform = useCallback(() => {
		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
			}),
		);

		setCallState((p) => ({
			...p,
			showCallModalType : 'feedbackModal',
			status            : 'completed',
			callEndAt         : new Date(),
		}));
	}, [dispatch, setCallState]);

	return {
		unmountVoiceCall,
		openFeedbackform,
	};
};
export default useCloseVoiceCall;
