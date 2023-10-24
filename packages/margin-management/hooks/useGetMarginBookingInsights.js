import { useRequest } from '@cogoport/request';

function useGetMarginBookingInsights({ marginId = '' }) {
	const [{ loading, data }] = useRequest(
		{
			url    : '/get_margin_booking_insights',
			method : 'GET',
			params : {
				margin_id: marginId,
			},
		},
		{
			manual: false,
		},
	);

	return {
		data,
		loading,
	};
}

export default useGetMarginBookingInsights;
