import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useBulkCreateStandAloneQuestion({ setShowBulkUpload, questionSetId, listSetQuestions }) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/bulk_create_stand_alone_question',
	}, { manual: true });

	const bulkCreateStandAloneQuestion = async ({ uploadDocument }) => {
		try {
			await trigger({
				data: {
					test_question_set_id : questionSetId,
					file_url             : uploadDocument,
				},
			});

			setShowBulkUpload(false);
			listSetQuestions({ questionToShow: '' });

			Toast.success('Bulk question set uploaded successfully');
		} catch (err) {
			Toast.error('Please upload the file with correct format');
		}
	};

	return {
		loading,
		bulkCreateStandAloneQuestion,
	};
}

export default useBulkCreateStandAloneQuestion;
