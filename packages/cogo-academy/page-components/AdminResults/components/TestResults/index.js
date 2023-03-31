import { Placeholder } from '@cogoport/components';
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

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{Array(3).fill('').map(() => (
					<div
						className={styles.placeholder_inner_container}
					>
						<Placeholder height="24px" />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(stats_data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Header header_data={header_data} loading={loading} />
			<div className={styles.info_row}>
				<BasicDetails basic_info_data={basic_info_data} />
				<PercentagePassed stats_data={stats_data} />
				<DifficultyAndTopicDistribution data={stats_data} toggleState={toggleState} />
			</div>
		</div>
	);
}

export default TestResults;
