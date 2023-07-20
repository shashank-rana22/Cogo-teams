import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

export const useSetInACall = () => {
	const dispatch = useDispatch();

	const setInACall = (call_status) => {
		dispatch(
			setProfileState({
				video_call_recipient_data : {},
				is_in_video_call          : call_status,
			}),
		);
	};

	return {
		setInACall,
	};
};
