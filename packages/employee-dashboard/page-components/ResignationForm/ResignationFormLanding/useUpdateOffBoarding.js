import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateOffBoarding = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : 'update_off_boarding_application',
	}, { manual: true });

	const requestCancellation = async ({ payload }) => {
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
		requestCancellation,
	};
};

export default useUpdateOffBoarding;
