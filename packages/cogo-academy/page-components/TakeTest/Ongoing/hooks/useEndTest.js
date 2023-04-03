import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

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

	const endTest = async () => {
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
	};

	return {
		endTest,
		endTestLoading: loading,
	};
};

export default useEndTest;
