import { useRequest } from '@cogoport/request';

const useGetKamPromotionStats = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_kam_promotion_stats',
	}, { manual: false });

	const getPromoStats = async () => {
		await trigger();
	};

	return {
		loading,
		statsData    : data,
		refetchStats : getPromoStats,
	};
};

export default useGetKamPromotionStats;
