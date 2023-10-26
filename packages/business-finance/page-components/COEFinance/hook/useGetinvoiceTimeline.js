import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetInvoiceTimeline = ({ id = '' }) => {
	const [
		{ data = {}, loading = false },
		trigger,
	] = useRequestBf(
		{
			url     : `/sales/invoice/timeline/${id}`,
			method  : 'get',
			authKey : 'get_sales_invoice_timeline_by_id',
		},
		{ manual: true },
	);

	const getInvoiceDetailsApi = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [trigger]);

	return {
		loading,
		data,
		getInvoiceDetailsApi,
	};
};
export default useGetInvoiceTimeline;
