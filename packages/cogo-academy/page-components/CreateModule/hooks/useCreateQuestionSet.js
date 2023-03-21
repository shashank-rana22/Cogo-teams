import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const actionNameMapping = {
	delete : 'deleted',
	create : 'created',
	update : 'updated',
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
		from,
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

			if (type === 'delete' && from !== 'test') {
				router.push('/learning/test-module');
			}

			if (from === 'test') {
				getTestQuestionTest();
			} else {
				setShowForm(false);
				setEditDetails({});
				getTestQuestionTest({ questionSetId: res?.data?.id });
				setQuestionSetId(res?.data?.id);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'Something went wrong');
		}
	};

	return {
		loading: loading || loadingUpdate,
		createQuestionSet,
	};
}

export default useCreateQuestionSet;
