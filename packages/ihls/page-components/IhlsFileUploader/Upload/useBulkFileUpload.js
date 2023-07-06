import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest, useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkFileUpload = ({ refetch, setShow }) => {
	const { profile = {} } = useSelector((state) => (state));

	const [{ loading: bulkFileLoading = false }, trigger] = useRequest({
		url    : '/bulk_create_question_answer_set',
		method : 'POST',
	}, { manual: true });
	// const [{ loading: bulkFileLoading = false}, trigger] = useAthenaRequest({
	// 	url    : 'shipments_by_hscode',
	// 	method : 'post',
	// }, { manual: true });

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
			Toast.error(getApiErrorString(error.response?.data));

			// refetch();
			// setShow(false);
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
