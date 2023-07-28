import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

export const useSetInACall = () => {
	const dispatch = useDispatch();

	const saveInACallStatus = useCallback((inAcallStatus) => {
		let dataNeedToUpdate = {
			video_call_recipient_data : {},
			is_in_video_call          : inAcallStatus,
		};

		if (!inAcallStatus) {
			dataNeedToUpdate = {
				...dataNeedToUpdate,
				video_call_id: '',
			};
		}

		dispatch(
			setProfileState(dataNeedToUpdate),
		);
	}, [dispatch]);

	return {
		saveInACallStatus,
	};
};
