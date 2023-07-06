import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkFileUpload = ({ refetch, setShow }) => {
	const { profile = {} } = useSelector((state) => (state));

	const [{ loading: bulkFileLoading = false }, trigger] = useAthenaRequest({
		url    : '/athena/save_file_url',
		method : 'post',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const bulkUpload = async (val) => {
		try {
			const payload = {
				user_id : profile.user.id,
				files   : val?.upload_question,
			};

			await trigger({ data: payload });

			Toast.success('File uploaded Successfully');
			refetch();
			setShow(false);
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	return {
		bulkUpload,
		bulkFileLoading,
		control,
		errors,
		handleSubmit,
	};
};

export default useBulkFileUpload;
