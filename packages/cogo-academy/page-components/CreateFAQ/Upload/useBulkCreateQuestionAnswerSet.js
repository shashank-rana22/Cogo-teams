import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useBulkCreateQuestionAnswerSet = () => {
	const [{ loading: BulkCreateQuestionloading = false }, trigger] = useRequest({
		url    : 'bulk_create_question_answer_set',
		method : 'POST',
	}, { manual: true });

	const bulkCreateQuestionAnswerSet = async (val) => {
		try {
			const { upload_question } = val || {};

			const payload = {
				file_url: upload_question,
			};

			await trigger({ data: payload });

			Toast('Question uploaded Successfully');
		} catch (error) {
			console.log('error :: ', error);
			if (error?.message || error?.error?.message) {
				Toast(error?.message || error?.error?.message);
			}
		}
	};

	return {
		bulkCreateQuestionAnswerSet,
		BulkCreateQuestionloading,
	};
};

export default useBulkCreateQuestionAnswerSet;
