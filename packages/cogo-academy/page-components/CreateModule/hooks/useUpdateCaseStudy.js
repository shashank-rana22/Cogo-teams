import { useRequest } from '@cogoport/request';

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

			getTestQuestionTest({ questionSetId });
			setAllKeysSaved(true);
			setEditDetails({});
			reset();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading,
		updateCaseStudy,
	};
}

export default useUpdateCaseStudy;
