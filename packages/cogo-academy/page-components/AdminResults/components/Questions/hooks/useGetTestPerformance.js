import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetTestPerformace = ({ test_id = '' }) => {
	const [toggleState, setToggleState] = useState(false);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_test_performance',
		params : {
			test_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	const {
		test_name = '',
		validity_start = '',
		validity_end = '',
		topics_covered = [],
		time_taken = '',
		required_pass_percent = '',
		failed_and_passed = {},
		total_students_appeared = '',
		total_questions = '',
	} = stats_data || {};

	const header_data = {
		test_name,
		validity_start,
		validity_end,
		setToggleState,
	};

	const basic_info_data = {
		topics_covered,
		time_taken,
		required_pass_percent,
		failed_and_passed,
		total_students_appeared,
		total_questions,
	};

	return {
		header_data,
		basic_info_data,
		toggleState,
		stats_data,
		loading,
	};
};
export default useGetTestPerformace;
