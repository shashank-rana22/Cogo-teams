import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetForecastResults = () => {
	const [{ error, loading }, trigger] = useRequest({
		url    : '/get_forecast_results',
		method : 'GET',
	}, { manual: true });

	const getForecastResults = async ({ activeTab = '', pagination = '', filters }) => {
		try {
			const response = await trigger({
				params: {
					filters: {
						...filters,
						pagination,
						activeTab,
					},
				},
			});
			return response;
		} catch (err) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
		return null;
	};

	return {
		error,
		loading,
		getForecastResults,
	};
};

export default useGetForecastResults;
