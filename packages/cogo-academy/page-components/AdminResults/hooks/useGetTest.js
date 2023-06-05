import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetTest({ id }) {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test',
	}, { manual: false });

	const {
		stand_alone_questions = 0,
		case_study_questions = 0,
		subjective_questions = 0,
		is_retest_present = '',
	} = data || {};

	const questions = stand_alone_questions + case_study_questions + subjective_questions;

	const retest = is_retest_present;

	const getTest = useCallback(({ test_id }) => {
		try {
			trigger({
				params: {
					id: test_id,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		getTest({ test_id: id });
	}, [getTest, id]);

	return {
		loading,
		data,
		getTest,
		questions,
		retest,
	};
}

export default useGetTest;
