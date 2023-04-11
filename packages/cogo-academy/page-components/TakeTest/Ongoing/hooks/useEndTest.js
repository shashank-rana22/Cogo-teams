import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useEndTest = ({ setActiveState = () => {}, setShowTimeOverModal, test_user_mapping_id }) => {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/submit_test',
	});

	const endTest = useCallback(async () => {
		try {
			await trigger({
				data: {
					test_user_mapping_id,
				},
			});

			localStorage.removeItem(`current_question_${test_id}_${user_id}`);
			localStorage.removeItem('visibilityChangeCount');
			localStorage.removeItem(`current_question_id_${test_id}_${user_id}`);

			setShowTimeOverModal(false);
			setActiveState('completed');
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [setActiveState, setShowTimeOverModal, test_id, test_user_mapping_id, trigger, user_id]);

	return {
		endTest,
		endTestLoading: loading,
	};
};

export default useEndTest;
