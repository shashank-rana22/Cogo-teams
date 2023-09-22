import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSageArOutstandingsStats = ({ entityCode }) => {
	const [
		{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/outstanding/overall-customer-outstanding',
			method  : 'get',
			authKey : 'get_payments_outstanding_overall_customer_outstanding',
		},
		{ manual: true },
	);
	useEffect(() => {
		trigger({
			params: {
				entityCode,
			},
		});
	}, [
		entityCode,
		trigger,
	]);
	return {
		statsLoading : loading,
		statsData    : data || {},
	};
};

export default useGetSageArOutstandingsStats;
