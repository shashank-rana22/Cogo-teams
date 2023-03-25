import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import BasicDetails from './BasicDetails';
import DifficultyAndTopicDistribution from './DifficultyAndTopicDistribution';
import Header from './Header';
import PercentagePassed from './PercentagePassed';
import styles from './styles.module.css';

function TestResults({ test_id = '' }) {
	const [toggleState, setToggleState] = useState(false);
	// const data2 = {
	// 	test_name             : 'Machine Learning',
	// 	validity_start        : '2023-03-25 14:30:00',
	// 	validity_end          : '2023-03-26 14:30:00',
	// 	pass_percentage       : 70,
	// 	topics_covered        : ['History', 'Civil'],
	// 	time_taken            : 102,
	// 	class_average         : 50,
	// 	required_pass_percent : 23,
	// 	topic_wise_percent    : { History: 23, Civil: 34 },
	// 	difficulty_wise_stats : {
	// 		low_percentage    : 20,
	// 		medium_percentage : 30,
	// 		high_percentage   : 40,
	// 	},
	// 	total_students_appeared : 50,
	// 	failed_and_passed       : {
	// 		total_passed : 23,
	// 		total_failed : 45,
	// 	},
	// };

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			test_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};
	// const stats_data = data2 || {};

	if (loading) {
		return 'loading';
	}

	if (isEmpty(stats_data)) {
		return null;
	}
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
		toggleState,
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

	return (
		<div className={styles.container}>
			<Header header_data={header_data} />
			<div className={styles.info_row}>
				<BasicDetails basic_info_data={basic_info_data} />
				<PercentagePassed stats_data={stats_data} />
				<DifficultyAndTopicDistribution data={data} toggleState={toggleState} />
			</div>
		</div>
	);
}

export default TestResults;
