/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetAdminTestResult({ activeTab, test_id }) {
	const [filters, setFilters] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_admin_question_wise_test_result',
	}, { manual: true });

	const [{ data:studentWiseData, loading:studentWiseLoading }, studentWiseTrigger] = useRequest({
		method : 'GET',
		url    : '/get_student_question_wise_test_result',
	}, { manual: true });

	const MAPPING = {
		students: {
			data    : studentWiseData,
			loading : studentWiseLoading,
			trigger : studentWiseTrigger,
		},
		questions: {
			data,
			loading,
			trigger,
		},
	};

	const getAdminTestResult = async () => {
		const triggerToUse = MAPPING?.[activeTab].trigger;

		try {
			const res = await triggerToUse({
				params: { test_id, filters },
			});

			console.log('res', res);
		} catch (err) {
			console.log('err', err);
		}
	};

	useEffect(() => {
		getAdminTestResult();
	}, []);

	useEffect(() => {
		getAdminTestResult();
	}, [activeTab]);

	return {
		loading,
		data,
		getAdminTestResult,
		setFilters,
		filters,
	};
}

export default useGetAdminTestResult;
