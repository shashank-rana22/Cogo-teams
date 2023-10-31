import { useHarbourRequest } from '@cogoport/request';

const useGetOrderDates = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_order_dates',
	}, { manual: false });

	return { loading, data };
};

export default useGetOrderDates;
