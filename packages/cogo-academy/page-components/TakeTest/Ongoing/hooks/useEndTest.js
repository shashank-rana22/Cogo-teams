import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useEndTest = () => {
	const {
		general: { query: { test_id } },
		profile: { user: { id: user_id } },
	} = useSelector((state) => state);

	const router = useRouter();

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

			router.push('/learning?activeTab=test_module');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		endTest,
		endTestLoading: loading,
	};
};

export default useEndTest;
