import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useDownloadOverseasUTR = () => {
	const [{ data : overseasUTRdownloadData, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun/download-overseas-utr',
		method  : 'get',
		authKey : 'get_purchase_payrun_download_overseas_utr',
	}, { manual: true, autoCancel: false });

	const overseasUTRdownload = (id = '') => {
		try {
			const res = trigger({
				params: {
					payrunId: id,
				},
			});
			const { data = {} } = res || {};
			const downloadFile = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}`
             + `/purchase/download/document?id=${data.urlId}`;
			if (data.urlId) window.open(downloadFile);
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Download');
		}
	};
	return {
		overseasUTRdownloadData,
		loading,
		overseasUTRdownload,
	};
};

export default useDownloadOverseasUTR;
