import { Toast } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useGenerateIndentPdf = () => {
	const [{ loading, data }, trigger] = usePublicRequest({
		method : 'post',
		url    : 'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
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
		} catch (err) {
			toastApiError(err);
		}
	};

	return { loading, data, generatePdf };
};

export default useGenerateIndentPdf;
