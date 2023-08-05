import { Toast } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

// interface FilterInterface {
// 	filters?:{
// 		month?:string
// 		query?:string
// 		entity?:string
// 	}
// }

const useBookShipmentCount = ({ filters }) => {
	const [
		{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/pnl/accrual/booking-jobs-count',
			method  : 'get',
			authKey : 'get_pnl_accrual_booking_jobs_count',
		},
		{ manual: true },
	);
	console.log(filters, 'filters');

	const { year, month } = filters || {};
	const getShipmentCount = useCallback(async () => {
		try {
			await trigger({
				params: {
					year          : year || undefined,
					month         : month || undefined,
					archiveStatus : 'BILLED',

				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [year, month, trigger]);

	useEffect(() => {
		getShipmentCount();
	}, [getShipmentCount]);

	return {
		getShipmentCount,
		data,
		loading,
	};
};
export default useBookShipmentCount;
