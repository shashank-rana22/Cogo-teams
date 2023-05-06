import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetTest from '../../hooks/useGetTest';
import useGetTestPerformace from '../Questions/hooks/useGetTestPerformance';

import BasicDetails from './BasicDetails';
import DifficultyAndTopicDistribution from './DifficultyAndTopicDistribution';
import Header from './Header';
import PercentagePassed from './PercentagePassed';
import styles from './styles.module.css';

function TestResults({ test_id = '' }) {
	const { loading, stats_data, basic_info_data, toggleState, header_data } = useGetTestPerformace({ test_id });

	const { questions, retest } = useGetTest({ id: test_id });

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
				<BasicDetails basic_info_data={basic_info_data} questions={questions} />

				<PercentagePassed stats_data={stats_data} />

				<DifficultyAndTopicDistribution
					data={stats_data}
					toggleState={toggleState}
					header_data={header_data}
					retest={retest}
				/>
			</div>
		</div>
	);
}

export default TestResults;
