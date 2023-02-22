import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useVendorStats = () => {
	const [{ data, loading: loadingStats }, trigger] = useRequest({
		method : 'get',
		url    : '/get_vendor_stats',
	}, { manual: true });

	const getStats = () => {
		try {
			trigger({});
		} catch (e) {
			// Toast.error(e.data);
		}
	};

	useEffect(() => {
		getStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loadingStats,
		data,
	};
};

export default useVendorStats;
