import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetSageArOutstandingsStats = ({ entityCode }) => {
	const {
		profile: { authorizationparameters, selected_agent_id },
	} = useSelector((state) => state);

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
		authorizationparameters,
		selected_agent_id,
		trigger,
	]);
	return {
		statsLoading : loading,
		statsData    : data || {},
	};
};

export default useGetSageArOutstandingsStats;
