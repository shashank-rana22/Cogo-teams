import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import TestResultMessage from '../../../../commons/TestResultMessage';
import QuestionWiseStats from '../../commons/QuestionWiseStats';

import GoToDetails from './GoToDetails';
import Percentile from './Percentile';
import styles from './styles.module.css';
import TopicWisePercentile from './TopicWisePercentile';

function LastTestResults() {
	const {
		profile: { user: { id: user_id } },
	} = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			user_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	const { topic_wise_percentile, question_stats, status, test_id } = stats_data || {};

	const hasPassed = status === 'passed';

	if (isEmpty(stats_data) || loading) {
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
