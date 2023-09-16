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
		setDownloadButtonState = () => {},
		setRenderContent = () => {},
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
			setRenderContent('form');
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something Went Wrong');
		}
	};

	return { loading, generatePdf };
};

export default useGeneratePdf;
