import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const usePostDownloadPayrunHistory = () => {
	const [{ data:payrunHistory, loading }, trigger] = useRequestBf({
		url     : '/purchase/payrun/download-zip',
		method  : 'post',
		authKey : 'post_purchase_payrun_download_zip',
	}, { manual: true, autoCancel: false });
	const downloadPayrunHistory = async (id) => {
		try {
			const res = await trigger({
				data: {
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
		downloadPayrunHistory,
		loading,
		payrunHistory,
	};
};

export default usePostDownloadPayrunHistory;
