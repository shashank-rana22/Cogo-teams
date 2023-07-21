import { useRequest } from '@cogoport/request';

const useGetFclFreightRateStats = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_fcl_freight_rate_charts',
		method : 'GET',
	}, { manual: true });

	const getStats = async () => {
		try {
			await trigger({ params: { filters: { } } });
		} catch (err) {
			// console.log(err);
		}
	};

	// useEffect(() => () => {
	// 	getStats();
	// }, [getStats()]);

	return { data, loading, getStats };
};

export default useGetFclFreightRateStats;
