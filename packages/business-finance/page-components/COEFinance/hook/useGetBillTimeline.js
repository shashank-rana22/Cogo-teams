import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetBillTimeline = ({
	id = '',
}) => {
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
		{
			url     : `/purchase/bills/${id}/bill-time-line`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id_bill_time_line',
		},
		{ manual: true },
	);

	const getBillTimeLine = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			Toast.error('TIMELINE DOES NOT EXIST');
		}
	}, [trigger]);

	return {
		data,
		loading,
		getBillTimeLine,
	};
};
export default useGetBillTimeline;
