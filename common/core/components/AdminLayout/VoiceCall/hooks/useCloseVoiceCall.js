import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

const useCloseVoiceCall = ({
	setCallState,
}) => {
	const dispatch = useDispatch();

	const unmountVoiceCall = useCallback(() => {
		setCallState({});

		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
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
