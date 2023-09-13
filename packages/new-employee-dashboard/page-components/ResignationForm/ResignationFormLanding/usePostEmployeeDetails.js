import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const usePostEmployeeDetails = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_application',
	}, { manual: true });

	const postApplicationDetails = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		postApplicationDetails,
	};
};

export default usePostEmployeeDetails;
