import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const actionNameMapping = {
	delete : 'deleted',
	update : 'updated',
};

function useUpdateCaseStudy({
	setEditDetails,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	reset = () => {},
	setQuestionToDelete = () => {},
	listSetQuestions,
}) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_case_study',
	}, { manual: true });

	const updateCaseStudy = async ({
		values,
		id,
		action,
	}) => {
		try {
			await trigger({
				data: action === 'delete' ? { id, status: 'inactive' } : { ...values, id },
			});

			Toast.success(`Case study question ${actionNameMapping[action]} successfully`);

			listSetQuestions({
				questionSetId,
				...(action !== 'delete' ? { questionToShow: id } : { pageToShow: 1 }),
			});

			getTestQuestionTest({ questionSetId });

			if (action === 'delete') {
				setAllKeysSaved(true);
				setEditDetails({});
				setQuestionToDelete({});
				reset();
			}
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		loading,
		updateCaseStudy,
	};
}

export default useUpdateCaseStudy;
