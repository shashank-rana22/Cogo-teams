import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useDownloadOverseasUTR = () => {
	const [{ data : overseasUTRdownloadData, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun/download-overseas-utr',
		method  : 'get',
		authKey : 'get_purchase_payrun_download_overseas_utr',
	}, { manual: true });

	const overseasUTRdownload = async (id = '') => {
		try {
			const res = await trigger({
				params: {
					payrunId: id,
				},
			});
			const { data = {} } = res || {};
			const bfUrl = process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL;
			const downloadFile = `${bfUrl}/purchase/download/document?id=${data.urlId}`;
			if (data.urlId) window.open(downloadFile);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Download');
		}
	};
	return {
		overseasUTRdownloadData,
		loading,
		overseasUTRdownload,
	};
};

export default useDownloadOverseasUTR;
