import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useEndTest = ({ setActiveState = () => {}, setShowTimeOverModal, test_user_mapping_id }) => {
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

			localStorage.removeItem('visibilityChangeCount');

			setShowTimeOverModal(false);
			setActiveState('completed');
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [setActiveState, setShowTimeOverModal, test_user_mapping_id, trigger]);

	return {
		endTest,
		endTestLoading: loading,
	};
};

export default useEndTest;
