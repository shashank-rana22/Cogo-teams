import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const PATH = process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL;

const useGetDownloadReport = ({ size, globalFilters }) => {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable-bill/generate-invoice',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_generate_invoice',
		},
		{ manual: true },
	);

	const { dueDate, invoiceDate, uploadDate, search, ...rest } = globalFilters || {};
	const generateInvoice = async () => {
		try {
			const resp = await trigger({
				params: {
					q                  : search,
					...rest,
					fromUploadBillDate : uploadDate?.startDate || undefined,
					toUploadBillDate   : uploadDate?.endDate || undefined,
					fromBillDate       : invoiceDate?.startDate || undefined,
					toBillDate         : invoiceDate?.endDate || undefined,
					pageSize           : size,
					type               : 'all',
				},
			});
			const { data = {} } = resp || {};
			const downloadFile = `${PATH}/purchase/download/document?id=${data}`;
			if (data) window.open(downloadFile);
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Download');
		}
	};
	return { generateInvoice, loading };
};

export default useGetDownloadReport;
