import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import { openDownloadLink } from '../utils';

const usePaymentInitiatedDownload = () => {
	const [{ data: downloadData, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun/download',
		method  : 'get',
		authKey : 'get_purchase_payrun_download',
	}, { manual: true, autoCancel: false });

	const getDownloadPayrunPayload = (id, batchNo) => ({
		payrunId: id,
		batchNo,
	});
	const downloadPayrun = async (itemData) => {
		const { id = '', batchNo = '' } = itemData || {};
		const getPayload = getDownloadPayrunPayload(id, batchNo);
		try {
			const res = await trigger({
				params: getPayload,
			});
			const { data = {} } = res || {};
			const downloadFile = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}`
             + `/purchase/download/document?id=${data.urlId}`;
			if (data.urlId) openDownloadLink(downloadFile);
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Download');
		}
	};
	return {
		downloadData,
		downloadPayrun,
		loading,
	};
};

export default usePaymentInitiatedDownload;
