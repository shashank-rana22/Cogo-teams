import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest, useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkFileUpload = ({ refetch, setShow }) => {
	const { profile = {} } = useSelector((state) => (state));

	const [{ loading: BulkFileLoading = false }, trigger] = useRequest({
		url    : 'bulk_create_question_answer_set',
		method : 'POST',
	}, { manual: true });
	// const [{ loading: BulkFileLoading = false}, trigger] = useAthenaRequest({
	// 	url    : 'shipments_by_hscode',
	// 	method : 'post',
	// }, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const bulkUpload = async (val) => {
		try {
			const payload = {
				user_id : profile?.user?.id || null,
				files   : val?.upload_question || {},
			};

			await trigger({ data: payload });

			Toast('File uploaded Successfully');
			refetch();
			setShow(false);
			// router.back();
		} catch (error) {
			if (error?.message || error?.error?.message) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
			// refetch();
			// setShow(false);
		}
	};

	return {
		bulkUpload,
		BulkFileLoading,
		control,
		errors,
		handleSubmit,
	};
};

export default useBulkFileUpload;
