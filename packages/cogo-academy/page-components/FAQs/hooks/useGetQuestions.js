import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetQuestions({ id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_question',
	}, { manual: true });

	const fetchQuestions = useCallback(async () => {
		try {
			await trigger({
				params: {
					id,
				},
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [id, trigger]);

	useEffect(() => {
		if (id) {
			fetchQuestions();
		}
	}, [fetchQuestions, id]);

	return {
		refetchQuestions: fetchQuestions,
		data,
		loading,
	};
}

export default useGetQuestions;
