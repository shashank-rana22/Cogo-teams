import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetTopTenReferral = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_top_ten_referral',
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
		data,
		loading,
	};
};

export default useGetTopTenReferral;
