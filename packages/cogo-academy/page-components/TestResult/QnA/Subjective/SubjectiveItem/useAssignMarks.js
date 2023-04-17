import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isNumber } from '@cogoport/utils';

function useAssignMarks({ setError = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_test_user_question_response',
	}, { manual: true });

	const handleAssignMarks = async ({ test_id, user_id, test_question_id, marks }) => {
		const marksInt = parseInt(marks, 10);

		if (!isNumber(marksInt)) {
			setError('Marks is not a valid Integer');
			return;
		}

		if (marksInt > 10) {
			setError('Marks should be less than or equal to 10');
			return;
		}

		try {
			const res = await trigger({
				data: {
					test_id,
					user_id,
					test_question_id,
					marks         : marksInt,
					question_type : 'subjective',
				},
			});

			if (res) {
				Toast.success('Marks Assigned Successfully');
			}
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
