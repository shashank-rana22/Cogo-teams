import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const useListCommunication = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
	}, { manual: false });

	const { is_not_seen_count = GLOBAL_CONSTANTS.zeroth_index, list = [] } = data || {};

	const formattedData = {
		not_seen_count : is_not_seen_count,
		list           : list || [],
		loading        : loading || false,
	};

	return {
		trigger,
		is_not_seen_count : is_not_seen_count || GLOBAL_CONSTANTS.zeroth_index,
		formattedData     : formattedData || {},
	};
};
export default useListCommunication;
