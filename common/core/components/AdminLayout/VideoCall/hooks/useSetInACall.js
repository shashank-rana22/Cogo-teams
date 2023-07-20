import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

export const useSetInACall = () => {
	const dispatch = useDispatch();

	const saveInACallStatus = useCallback((call_status) => {
		dispatch(
			setProfileState({
				video_call_recipient_data : {},
				is_in_video_call          : call_status,
			}),
		);
	}, [dispatch]);

	return {
		saveInACallStatus,
	};
};
