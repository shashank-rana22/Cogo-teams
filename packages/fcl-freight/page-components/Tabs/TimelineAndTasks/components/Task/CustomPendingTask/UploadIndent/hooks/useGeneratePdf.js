import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';

const useGeneratePdf = () => {
	const { loading, data, trigger } = useRequest(
		'post',
		false,
		'public',
	)(
		'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
	);

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
			toast.success('Uploaded Successfully');
			callback(res);
		} catch (error) {
			toast.error(getApiErrorString(error?.data) || 'Something Went Wrong');
		}
	};

	return { loading, data, generatePdf };
};

export default useGeneratePdf;
