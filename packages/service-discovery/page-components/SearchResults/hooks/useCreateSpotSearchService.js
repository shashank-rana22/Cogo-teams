import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useSpotSearchService = ({ refetchSearch = () => {}, rateCardData = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search_service',
		method : 'POST',
	}, { manual: true });

	const addService = async (values) => {
		try {
			await trigger({ data: values });
			refetchSearch({
				screenObj: {
					card_id : rateCardData.card,
					screen  : 'selectedCard',
				},
			});
		} catch (e) {
			Toast.error(e?.response?.message);
		}
	};

	return {
		addService,
		loading,
	};
};

export default useSpotSearchService;
