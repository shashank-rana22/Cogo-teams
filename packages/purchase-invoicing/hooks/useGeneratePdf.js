import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { usePublicRequest } from '@cogoport/request';

const useGeneratePdf = () => {
	const [{ loading }, trigger] = usePublicRequest({
		method : 'post',
		url    : 'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
	}, { manual: false });

	const generatePdf = async ({
		html,
		scale = 1,
		setShowTemplate = () => {},
		setGenerateInvoiceModal = () => {},
		setDownloadButtonState = () => {},
	}) => {
		try {
			const res = await trigger({
				data: {
					html,
					configs: {
						format: 'A4',
						scale,
					},
				},
			});
			Toast.success('Uploaded Successfully');
			setDownloadButtonState(res?.data?.pdf_url);
			setShowTemplate(false);
			setGenerateInvoiceModal(true);
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something Went Wrong');
		}
	};
	console.log('dataaaaaaaaaa');

	return { loading, generatePdf };
};

export default useGeneratePdf;
