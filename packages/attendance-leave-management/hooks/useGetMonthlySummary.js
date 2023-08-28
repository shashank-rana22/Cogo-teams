import { useHarbourRequest } from '@cogoport/request';

const useGetMonthlySummary = (cycle_id) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_monthly_summary',
		params : {
			cycle_id,
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetMonthlySummary;
