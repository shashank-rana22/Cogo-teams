import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTopTenReferralStats = () => {
	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_top_ten_referral_stats',
		method : 'get',
	}, { manual: true });

	const getReferralStats = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						q: query || undefined,

					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [trigger, query]);

	useEffect(() => {
		getReferralStats();
	}, [getReferralStats]);

	return {
		networkData: data,
		loading,
		debounceQuery,
	};
};

export default useGetTopTenReferralStats;
