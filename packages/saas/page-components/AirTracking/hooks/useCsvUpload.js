import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const keyMapping = {
	ocean : 'shipping_line_id',
	air   : 'airline_id',
};

const CSV_UPLOAD_API = {
	ocean : '/create_saas_container_tracker_via_csv',
	air   : '/create_saas_air_tracker_via_csv',
};

const useCsvUpload = ({ trackingType = 'ocean', closeModalHandler }) => {
	const { query } = useRouter();
	const { branch_id } = query;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : CSV_UPLOAD_API[trackingType],
	}, { manual: true });

	const uploadCsvHandler = async ({ payload }) => {
		try {
			await trigger({
				data: {
					...payload,
					organization_branch_id: branch_id,
				},
			});
			closeModalHandler();
		} catch (err) {
			console.error(err);
		}
	};

	const submitHandler = (formData) => {
		const { fileValue = '', operatorLine = '' } = formData || {};

		const payload = {
			file_url                   : fileValue,
			[keyMapping[trackingType]] : operatorLine,
		};

		uploadCsvHandler({ payload });
	};

	return {
		submitHandler, loading,
	};
};

export default useCsvUpload;
