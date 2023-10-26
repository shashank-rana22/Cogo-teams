import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetMarginBookingInsights({ marginId = '' }) {
	const [toggleState, setToggleState] = useState(false);

	const currentDate = new Date();
	const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
	const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/get_margin_booking_insights',
			method : 'GET',
		},
		{
			manual: true,
		},
	);

	const getMarginBookingInsights = useCallback(async () => {
		try {
			const params = {
				margin_id : marginId,
				filters   : {
					from_date : toggleState ? firstDayOfPreviousMonth : firstDayOfCurrentMonth,
					to_date   : toggleState ? lastDayOfPreviousMonth : currentDate,
				},
			};

			await trigger({
				params,
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleState]);

	useEffect(() => {
		getMarginBookingInsights();
	}, [getMarginBookingInsights, toggleState]);

	return {
		data,
		loading,
		toggleState,
		setToggleState,
	};
}

export default useGetMarginBookingInsights;
