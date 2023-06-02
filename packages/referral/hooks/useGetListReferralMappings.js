import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListReferralMappings = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_referral_mappings',
		method : 'get',
	}, { manual: true });

	const getListReferrals = useCallback(() => {
		try {
			trigger({});
		} catch (error) {
			console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		getListReferrals();
	}, [getListReferrals]);

	return {
		networkData: data,
		loading,
	};
};

export default useGetListReferralMappings;
