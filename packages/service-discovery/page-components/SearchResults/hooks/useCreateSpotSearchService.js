import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useSpotSearchService = ({ refetchspotSearch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search_service',
		method : 'POST',
	}, { manual: true });

	const addService = async (values) => {
		try {
			await trigger({ data: values });
			refetchspotSearch();
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
