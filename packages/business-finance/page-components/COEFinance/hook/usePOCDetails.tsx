import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const usePOCDetails = (billId?: string) => {
	const [
		{ data: listInvoiceDetailsApiData, loading: listInvoiceDetailsApiLoading },
		listInvoiceDetailsApi,
	] = useRequestBf(
		{
			url     : `/purchase/bills/sid-details/${billId}`,
			method  : 'get',
			authKey : 'get_purchase_bills_sid_details_by_id',
		},
		{ autoCancel: false },
	);

	const [
		{ data: timeLineDetailsApiData, loading: timeLineDetailsApiLoading },
		timeLineDetailsApi,
	] = useRequestBf(
		{
			url     : `/purchase/bills/${billId}/bill-time-line`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id_bill_time_line',
		},
		{ autoCancel: false },
	);

	const getInvoiceDetailsApi = async () => {
		try {
			await listInvoiceDetailsApi({});
		} catch (err) {
			Toast.error('INVOICE DETAILS DOES NOT EXIST');
		}
	};

	const getTimeLineDetailsApi = async () => {
		try {
			await timeLineDetailsApi({});
		} catch (err) {
			Toast.error('TIMELINE DOES NOT EXIST');
		}
	};

	return {
		loading         : listInvoiceDetailsApiLoading,
		invoiceData     : listInvoiceDetailsApiData,
		timeLineData    : timeLineDetailsApiData,
		timeLineLoading : timeLineDetailsApiLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
	};
};
export default usePOCDetails;
