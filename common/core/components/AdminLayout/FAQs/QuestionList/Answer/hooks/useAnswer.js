import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useMemo } from 'react';

const useAnswer = ({ question }) => {
	const params = useMemo(
		() => ({
			id: question?.id,

		}),
		[question?.id],
	);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
		params,
	}, { manual: false });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params,
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [params, trigger]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
