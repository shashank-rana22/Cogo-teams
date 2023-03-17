import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const actionNameMapping = {
	delete : 'deleted',
	create : 'created',
	update : 'updates',
};

function useCreateQuestionSet() {
	const router = useRouter();

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
		delete : triggerUpdate,
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
				data:
				type === 'delete'
					? { id: questionSetId, status: 'inactive' }
					: { ...values, ...(type === 'edit' ? { id: questionSetId } : null) },
			});

			Toast.success(`Question set ${actionNameMapping[type]} successfully`);

			if (type === 'delete') {
				router.push('/learning/faq/create/test-module');
			}

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
