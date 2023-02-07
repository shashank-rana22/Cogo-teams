import { useRequest } from '@cogoport/request';

const useUpdatefeedbackQuestion = () => {
	const [{ loading: updateApiLoading = false }, trigger] = useRequest({
		method : 'post',
		url    : 'bulk_update_feedback_questions',
	}, { manual: 'true' });

	const onBulkUpdate = async ({
		questions = [],
		department = 'technology',
		setActiveTab = () => {},
	}) => {
		try {
			await trigger({
				params: {
					question_details: questions,
					department,
				},
			});
			setActiveTab('active');
		} catch (e) {
			console.log(e.toString());
		}
	};
	return {
		updateApiLoading,
		onBulkUpdate,
	};
};

export default useUpdatefeedbackQuestion;
