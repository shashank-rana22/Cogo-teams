import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useDownloadFileFormat = ({
	formattedData,
	value,
	setShowModal,
}) => {
	const onClose = () => { setShowModal({ download_format: false }); };

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/sales/accounts/download-sample',
			authKey : 'post_sales_accounts_download_sample',
			method  : 'post',
		},
		{ manual: false },
	);

	const payload = {
		accMode                      : value,
		generatePaymentExcelInfoList : formattedData,
	};

	const handleDownload = async () => {
		try {
			const rest = await trigger({
				data: payload,
			});
			const downloadFileFormat = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}
            /sales/download?id=${rest.data}`;
			if (rest.data) window.open(downloadFileFormat);
			onClose();
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	return { handleDownload, data, loading };
};

export default useDownloadFileFormat;
