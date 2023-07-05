import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest, useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkCreateQuestionAnswerSet = ({ refetch }) => {
	// const { general:{ query : { type } } } = useSelector((state) => (state));
	const { profile = {} } = useSelector((state) => (state));

	const [{ loading: BulkCreateQuestionloading = false }, trigger] = useRequest({
		url    : 'bulk_create_question_answer_set',
		method : 'POST',
	}, { manual: true });
	// const [{ loading: BulkCreateQuestionloading = false}, trigger] = useAthenaRequest({
	// 	url    : 'shipments_by_hscode',
	// 	method : 'post',
	// }, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const router = useRouter();

	const onClickBackButton = () => {
		router.back();
	};

	const bulkCreateQuestionAnswerSet = async (val) => {
		try {
			const payload = {
				user_id : profile?.user?.id || null,
				files   : val?.upload_question || {},
			};

			await trigger({ data: payload });

			Toast('Question uploaded Successfully');
			refetch();
			// router.back();
		} catch (error) {
			if (error?.message || error?.error?.message) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
			refetch();
		}
	};

	return {
		bulkCreateQuestionAnswerSet,
		BulkCreateQuestionloading,
		onClickBackButton,
		control,
		errors,
		handleSubmit,
	};
};

export default useBulkCreateQuestionAnswerSet;
