import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase, format } from '@cogoport/utils';

import QuestionWiseStats from '../../commons/QuestionWiseStats';
import TestResultMessage from '../../commons/TestResultMessage';

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
			test_id: 'c864325c-d27e-4d10-9045-d19f8a4f259a',
			user_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	const { topic_wise_percentile } = stats_data || {};

	return (
		<div className={styles.container}>
			<TestResultMessage stats_data={stats_data} />

			<div className={styles.stats}>
				<Percentile stats_data={stats_data} />

				<TopicWisePercentile topic_wise_percentile={topic_wise_percentile} />

				<QuestionWiseStats stats_data={stats_data} />

				<GoToDetails />
			</div>
		</div>
	);
}

export default LastTestResults;
