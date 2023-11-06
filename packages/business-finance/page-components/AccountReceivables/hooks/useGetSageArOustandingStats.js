import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSageArOutstandingsStats = ({ entityCode, include_defaulters }) => {
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
				excludeDefaulters: !include_defaulters,
			},
		});
	}, [
		entityCode,
		trigger,
		include_defaulters,
	]);
	return {
		statsLoading : loading,
		statsData    : data || {},
	};
};

export default useGetSageArOutstandingsStats;
