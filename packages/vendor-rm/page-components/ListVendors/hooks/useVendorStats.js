import { useRequest } from '@cogoport/request';

const useVendorStats = ({ activeEntity }) => {
	const [{ data, loading: loadingStats }] = useRequest({
		method : 'get',
		url    : '/get_vendor_stats',
		params : {
			cogo_entity_id: activeEntity || undefined,
		},
	}, { manual: false });

	return {
		loadingStats,
		data,
	};
};

export default useVendorStats;
