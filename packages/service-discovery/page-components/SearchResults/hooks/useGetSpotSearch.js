import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetSpotSearch = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search',
	}, { manual: true });

	const getSearch = async (props) => {
		const { spot_search_id = '', importer_exporter_id = '' } = props;

		try {
			await trigger({
				params: {
					id     : spot_search_id,
					intent : 'discovery',
					importer_exporter_id,
				},
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};
	return {
		refetchSearch: getSearch,
		loading,
		data,
	};
};
export default useGetSpotSearch;
