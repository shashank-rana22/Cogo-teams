import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useBulkCreateStandAloneQuestion() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/bulk_create_stand_alone_question',
	}, { manual: true });

	const bulkCreateStandAloneQuestion = async ({
		questionSetId,
		uploadDocument,
	}) => {
		try {
			await trigger({
				data: {
					test_question_set_id: questionSetId,
					file_url:
						typeof uploadDocument?.[0] === 'string'
							? uploadDocument?.[0]
							: uploadDocument?.[0]?.finalUrl,
				},
			});

			Toast.success('Bulk question set uploaded successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading,
		bulkCreateStandAloneQuestion,
	};
}

export default useBulkCreateStandAloneQuestion;
