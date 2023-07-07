import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({ profile, val }) => ({
	user_id : profile.user.id,
	files   : val?.upload_question,
});

const useBulkFileUpload = ({ refetch, setShow }) => {
	const { profile = {} } = useSelector((state) => (state));
	const [{ loading: bulkFileLoading }, trigger] = useAthenaRequest({
		url    : '/athena/save_file_url',
		method : 'post',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const bulkUpload = async (val) => {
		try {
			await trigger({ data: getPayload({ profile, val }) });

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
