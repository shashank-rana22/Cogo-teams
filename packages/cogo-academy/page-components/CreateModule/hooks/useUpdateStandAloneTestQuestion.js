import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

function useUpdateStandAloneTestQuestion() {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_stand_alone_test_question',
	}, { manual: true });

	const updateStandAloneTestQuestion = async ({
		values,
		questionSetId,
		getTestQuestionTest,
		reset = () => {},
		testQuestionId,
		action,
		setEditDetails,
		setAllKeysSaved,
	}) => {
		try {
			const { hasError, ...payload } = getPayload({
				values,
				type: 'stand_alone',
				questionSetId,
				action,
				testQuestionId,
			});

			if (!isEmpty(hasError)) {
				hasError.forEach((item) => {
					Toast.error(item);
				});
				return;
			}

			await trigger({
				data:
						action === 'delete'
							? { id: testQuestionId, status: 'inactive' }
							: payload,
			});

			getTestQuestionTest({
				questionSetId,
				...(action === 'delete' ? { pageToShow: 1 } : null),
			});

			setAllKeysSaved(true);
			setEditDetails({});
			reset();
		} catch (err) {
			console.log('err::', err);
			Toast.error(getApiErrorString(err.response.data));
		}
	};

	return {
		loading,
		updateStandAloneTestQuestion,
	};
}

export default useUpdateStandAloneTestQuestion;
