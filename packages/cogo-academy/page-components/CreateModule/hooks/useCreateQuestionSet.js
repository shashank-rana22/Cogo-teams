import { useRequest } from '@cogoport/request';

function useCreateQuestionSet() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_test_question_set',
	}, { manual: true });

	const [{ loading:loadingUpdate }, triggerUpdate] = useRequest({
		method : 'post',
		url    : '/update_test_question_set',
	}, { manual: true });

	const triggerMapping = {
		edit   : triggerUpdate,
		create : trigger,
	};

	const createQuestionSet = async ({
		values,
		setQuestionSetId,
		getTestQuestionTest,
		type,
		questionSetId,
		setEditDetails,
		setShowForm,
	}) => {
		const triggerToUse = triggerMapping?.[type];

		try {
			const res = await triggerToUse({
				data: { ...values, ...(type === 'edit' ? { id: questionSetId } : null) },
			});

			setShowForm(false);
			setEditDetails({});
			getTestQuestionTest({ questionSetId: res?.data?.id });
			setQuestionSetId(res?.data?.id);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading: loading || loadingUpdate,
		createQuestionSet,
	};
}

export default useCreateQuestionSet;
