import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListReferralMappings = () => {
	const { query = '', debounceQuery } = useDebounceQuery();
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_referral_mappings',
		method : 'get',
	}, { manual: true });

	const getListReferrals = useCallback(() => {
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
		getListReferrals();
	}, [getListReferrals]);

	return {
		networkData: data,
		loading,
		debounceQuery,
	};
};

export default useGetListReferralMappings;
