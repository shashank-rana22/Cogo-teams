import { Toast } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useGeneratePdf = () => {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
		method : 'POST',
	}, { manual: true });

	const generatePdf = async ({ html, scale = 1, callback = () => {} }) => {
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
			callback(res);
		} catch (error) {
			toastApiError(error);
		}
	};

	return { loading, generatePdf };
};

export default useGeneratePdf;
