import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTopTenReferralStats = () => {
	// const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_top_ten_referral_stats',
		method : 'get',
	}, { manual: true });

	const getReferralStats = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		getReferralStats();
	}, [getReferralStats]);

	return {
		networkData: data,
		loading,
	};
};

export default useGetTopTenReferralStats;
