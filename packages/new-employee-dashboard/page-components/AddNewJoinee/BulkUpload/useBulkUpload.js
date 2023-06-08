import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const SAMPLE_DOCUMENT_URL = `https://cogoport-production.sgp1.digitaloceanspaces.com
								/ab3309b85b52e198b4c2bb691a7fb609/new_employee_bulk_upload_sample_sheet.csv`;

const useBulkUpload = () => {
	const [{ loading = false }, trigger] = useHarbourRequest({
		url    : 'bulk_upload_employee_details',
		method : 'post',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const onClickViewSampleFile = () => {
		window.open(SAMPLE_DOCUMENT_URL, '_blank', 'noreferrer');
	};

	const bulkUploadNewHire = async (val) => {
		try {
			const { finalUrl } = val?.upload_new_hire_info || {};

			const payload = {
				file_url: finalUrl,
			};

			await trigger({ data: payload });

			Toast('New Hire details is uploaded Successfully');
		} catch (error) {
			if (error?.message || error?.error?.message) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		}
	};

	return {
		bulkUploadNewHire,
		loading,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
	};
};

export default useBulkUpload;
