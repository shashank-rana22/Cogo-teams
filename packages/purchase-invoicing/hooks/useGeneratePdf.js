import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { usePublicRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useGeneratePdf = () => {
	const [{ loading }, trigger] = usePublicRequest({
		method : 'post',
		url    : GLOBAL_CONSTANTS.invoice_crawler,
	}, { manual: false });

	const generatePdf = async ({
		html = '',
		scale = 1,
		callback = () => {},
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
			callback(res);
		} catch (error) {
			toastApiError(error);
		}
	};

	return { loading, generatePdf };
};

export default useGeneratePdf;
