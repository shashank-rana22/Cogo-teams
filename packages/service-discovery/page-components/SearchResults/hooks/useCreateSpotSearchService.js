import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useSpotSearchService = ({ refetchSearch = () => {}, checkout_id = '' }) => {
	const URL = checkout_id ? 'create_checkout_service' : 'add_spot_search_service';

	const [{ loading }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const addService = async (values) => {
		try {
			await trigger({ data: values });
			Toast.success('Service added successfully!');
			refetchSearch();
			return true;
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
			return false;
		}
	};

	return {
		addService,
		loading,
	};
};

export default useSpotSearchService;
