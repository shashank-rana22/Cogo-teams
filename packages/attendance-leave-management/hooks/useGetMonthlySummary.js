import { useHarbourRequest } from '@cogoport/request';

const useGetMonthlySummary = (cycle_id) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_monthly_summary',
		params : {
			cycle_id,
			performed_by_id: '50d1bb4e-b780-4ec7-ba51-2d1cfaf75f7d',
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetMonthlySummary;
