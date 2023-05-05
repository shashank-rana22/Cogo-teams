import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const regexPattern = /^[+-]?\d*\.?\d+$/;

function useAssignMarks({ setError = () => {}, activeAttempt }) {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_test_user_question_response',
	}, { manual: true });

	const handleAssignMarks = async ({ test_id, user_id, test_question_id, marks }) => {
		const validMarks = regexPattern.test(marks);
		if (validMarks) {
			if (parseFloat(marks) > 10.0) {
				setError('Marks should be less than or equal to 10');
				return;
			}
		} else {
			setError('Marks is not a valid Integer');
			return;
		}

		try {
			await trigger({
				data: {
					test_id,
					user_id,
					test_question_id,
					marks          : parseFloat(marks),
					question_type  : 'subjective',
					active_attempt : activeAttempt === 'attempt_1',
				},
			});

			Toast.success('Marks Assigned Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		handleAssignMarks,
	};
}

export default useAssignMarks;
