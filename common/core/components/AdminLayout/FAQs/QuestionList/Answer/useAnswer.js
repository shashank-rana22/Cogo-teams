import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useAnswer = ({ question }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
	}, { manual: true });
	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					id: question?.id,
				},
			});
		} catch (error) {
			Toast.error(error);
		}
	}, [question?.id, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
