import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetUserSubmissionStats({ id, user_id }) {
	const [{ data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_user_submission_stats',
	}, { manual: false });

	const getUserSubmissionStats = useCallback(({ test_id, userId }) => {
		try {
			trigger({
				params: {
					test_id,
					user_id: userId,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		getUserSubmissionStats({ test_id: id, userId: user_id });
	}, [getUserSubmissionStats, id, user_id]);

	return {
		data,
	};
}

export default useGetUserSubmissionStats;
