import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../commons/LoadingState';
import TestResultMessage from '../../../../commons/TestResultMessage';
import QuestionWiseStats from '../../commons/QuestionWiseStats';

import GoToDetails from './GoToDetails';
import Percentile from './Percentile';
import styles from './styles.module.css';
import TopicWisePercentile from './TopicWisePercentile';

function LastTestResults(props) {
	const { data: stats_data = {}, loading } = props;

	const { topic_wise_percentile, question_stats, status, test_id } = stats_data || {};

	const hasPassed = status === 'passed';

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(stats_data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<TestResultMessage stats_data={stats_data} />

			<div className={styles.stats}>
				<Percentile stats_data={stats_data} hasPassed={hasPassed} />

				<TopicWisePercentile topic_wise_percentile={topic_wise_percentile} />

				<QuestionWiseStats question_stats={question_stats} />

				<GoToDetails test_id={test_id} />
			</div>
		</div>
	);
}

export default LastTestResults;
