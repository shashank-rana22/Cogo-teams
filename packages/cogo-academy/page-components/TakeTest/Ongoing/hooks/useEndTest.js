import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useEndTest = ({ setActiveState = () => {}, setShowTimeOverModal }) => {
	const {
		general: { query: { test_id } },
		profile: { user: { id: user_id } },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/submit_test',
	});

	const endTest = async () => {
		try {
			await trigger({
				data: {
					user_id, test_id,
				},
			});

			localStorage.removeItem(`current_question_${test_id}_${user_id}`);
			localStorage.removeItem('visibilityChangeCount');

			setShowTimeOverModal(false);
			setActiveState('completed');
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		endTest,
		endTestLoading: loading,
	};
};

export default useEndTest;
