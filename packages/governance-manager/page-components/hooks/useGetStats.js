import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetStats() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_service_provider_lifecycle_stats',
	}, { manual: true });

	const getStats = async () => {
		try {
			await trigger({
				params: {
					lifecycle: 'services_applied',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		data,
		loading,
	};
}
export default useGetStats;
