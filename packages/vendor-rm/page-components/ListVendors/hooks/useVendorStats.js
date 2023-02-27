import { useRequest } from '@cogoport/request';

const useVendorStats = () => {
	const [{ data, loading: loadingStats }] = useRequest({
		method : 'get',
		url    : '/get_vendor_stats',
	}, { manual: false });

	return {
		loadingStats,
		data,
	};
};

export default useVendorStats;
