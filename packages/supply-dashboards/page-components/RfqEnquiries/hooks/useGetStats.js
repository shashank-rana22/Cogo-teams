import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStats = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_monthly_rfqs_stats',
	}, { manual: true });
	const fetch = async () => {
		try {
			await trigger({
				params: {
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
	};
};
export default useGetStats;
