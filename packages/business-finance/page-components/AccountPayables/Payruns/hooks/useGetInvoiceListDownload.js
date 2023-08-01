import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import { dateFormatter } from '../helpers';

const useGetInvoiceListDownload = ({ globalFilters = {}, overseasData = '', size = '', activePayrunTab }) => {
	const [{ data: normalDownlodData, loading: normalLoading }, normalTrigger] = useRequestBf({
		url     : 'purchase/payrun/bill-list-view-download',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_view_download',
	}, { manual: true });

	const [{ data: advanceDownloadData, loading: advanceLoading }, advanceDownloadTrigger] = useRequestBf({
		url     : '/purchase/payrun/advance-doc-list-view-download',
		method  : 'get',
		authKey : 'get_purchase_payrun_advance_doc_list_view_download',
	}, { manual: true });

	const { createdAt, ...rest } = globalFilters;
	const { selectFromDate, selectToDate } = dateFormatter(createdAt);

	const getApi = overseasData === 'ADVANCE_PAYMENT' ? advanceDownloadTrigger : normalTrigger;

	const getDownloadPayload = () => ({
		...rest,
		startDate : selectFromDate || undefined,
		endDate   : selectToDate || undefined,
		pageSize  : size,
		state     : activePayrunTab,
	});
	const downloadInvoice = async () => {
		const getPayload = getDownloadPayload();
		try {
			const resp = await getApi({
				params: getPayload,
			});
			const { data = {} } = resp || {};
			const bfUrl = process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL;
			const downloadFile = `${bfUrl}/purchase/download/document?id=${data}`;
			if (data) window.open(downloadFile);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Download');
		}
	};
	return {
		downloadInvoice,
		loading: overseasData === 'ADVANCE_PAYMENT' ? advanceLoading : normalLoading,
		normalDownlodData,
		advanceDownloadData,
	};
};

export default useGetInvoiceListDownload;
