import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

const useCloseVoiceCall = ({
	setCallState,
}) => {
	const dispatch = useDispatch();

	const unmountVoiceCall = useCallback(({
		lead_user_id = '',
		lead_organization_id = '', callStartAt = '', callRecordId = '',
	} = {}) => {
		setCallState({});

		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
				...(lead_organization_id ? {
					lead_feedback_form_type : 'lead_org_feedback',
					lead_feedback_form_data : {
						lead_user_id,
						lead_organization_id,
						refetch_list             : false,
						communication_start_time : callStartAt,
						communication_end_time   : Date.now(),
						source                   : 'voice_call',
						callRecordId,
					},
				} : {}),

			}),
		);
	}, [dispatch, setCallState]);

	const openFeedbackform = useCallback(({ showFeedbackForm = false }) => {
		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
			}),
		);

		setCallState((p) => ({
			...p,
			showCallModalType : showFeedbackForm ? 'feedbackModal' : '',
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
