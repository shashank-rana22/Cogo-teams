import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useInvoiceDetails = ({
	id,
	serviceProviderId,
	billId,
	jobId,
	objectId,
}) => {
	const getId = () => {
		if (billId === undefined && id === undefined) {
			return objectId;
		}
		if (billId === undefined && objectId === undefined) {
			return id;
		}
		return billId;
	};

	const [{ data: invoiceDetails, loading: invoiceDetailsLoading }, listInvoiceDetailsApi] = useRequestBf(
		{
			url     : `/purchase/bills/sid-details/${getId()}`,
			method  : 'get',
			authKey : 'get_purchase_bills_sid_details_by_id',
		},
		{ manual: true },
	);

	const [{ data: timeLineDetails, loading: timeLineDetailsLoading }, timeLineDetailsApi] = useRequestBf(
		{
			url     : `/purchase/bills/${getId()}/bill-time-line`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id_bill_time_line',
		},
		{ manual: true },
	);

	const [{ data: profitabilityDetails, loading: profitabilityLoading }, profitabilityApi] = useRequestBf(
		{
			url     : '/common/job/profit',
			method  : 'get',
			authKey : 'get_common_job_profit',
		},
		{ manual: true },
	);

	const [{ data: supplierDetails, loading: supplierDetailsLoading }, supplierDetailsApi] = useRequestBf(
		{
			url     : '/purchase/bills/supplier-details',
			method  : 'get',
			authKey : 'get_purchase_bills_supplier_details',
		},
		{ manual: true },
	);

	const getInvoiceDetailsApi = async () => {
		try {
			await listInvoiceDetailsApi();
		} catch (err) {
			Toast.error('INVOICE DETAILS DOES NOT EXIST');
		}
	};

	const getTimeLineDetailsApi = async () => {
		try {
			await timeLineDetailsApi();
		} catch (err) {
			Toast.error('TIMELINE DOES NOT EXIST');
		}
	};

	const getProfitabilityApi = async () => {
		try {
			await profitabilityApi({ params: { jobId } });
		} catch (err) {
			Toast.error('PROFITABILITY DOES NOT EXIST');
		}
	};
	const getSupplierDetailsApi = async () => {
		try {
			await supplierDetailsApi({ params: { id: serviceProviderId } });
		} catch (err) {
			Toast.error('SUPPLIER DETAILS DOES NOT EXIST');
		}
	};

	return {
		invoiceDetailsLoading,
		invoiceDetails,
		timeLineDetails,
		timeLineDetailsLoading,
		profitabilityDetails,
		profitabilityLoading,
		supplierDetails,
		supplierDetailsLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
		getProfitabilityApi,
		getSupplierDetailsApi,
	};
};
export default useInvoiceDetails;
