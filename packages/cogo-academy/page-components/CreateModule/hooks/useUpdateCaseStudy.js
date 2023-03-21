import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const actionNameMapping = {
	delete : 'deleted',
	update : 'updated',
};

function useUpdateCaseStudy() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_case_study',
	}, { manual: true });

	const updateCaseStudy = async ({
		values,
		id,
		setEditDetails,
		getTestQuestionTest,
		setAllKeysSaved,
		reset,
		questionSetId,
		action,
	}) => {
		try {
			await trigger({
				data: action === 'delete' ? { id, status: 'inactive' } : { ...values, id },
			});

			Toast.success(`Case study question ${actionNameMapping[action]} successfully`);

			getTestQuestionTest({ questionSetId, ...(action !== 'delete' ? { questionToShow: id } : null) });
			setAllKeysSaved(true);
			setEditDetails({});
			reset();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		loading,
		updateCaseStudy,
	};
}

export default useUpdateCaseStudy;
