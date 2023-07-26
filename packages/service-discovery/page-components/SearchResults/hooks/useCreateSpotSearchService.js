import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useSpotSearchService = ({ refetchSearch = () => {}, rateCardData = {}, checkout_id = '' }) => {
	const URL = checkout_id ? 'create_checkout_service' : 'add_spot_search_service';

	const [{ loading }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const addService = async (values) => {
		try {
			await trigger({ data: values });
			refetchSearch({
				screenObj: {
					card_id : rateCardData.id,
					screen  : 'selectedCard',
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		addService,
		loading,
	};
};

export default useSpotSearchService;
