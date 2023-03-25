import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import BasicDetails from './BasicDetails';
import DifficultyAndTopicDistribution from './DifficultyAndTopicDistribution';
import PercentagePassed from './PercentagePassed';
import styles from './styles.module.css';

function TestResults({ test_id }) {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			test_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	if (loading) {
		return 'loading';
	}

	if (isEmpty(stats_data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<BasicDetails />
			<PercentagePassed stats_data={stats_data} />
			<DifficultyAndTopicDistribution />
		</div>
	);
}

export default TestResults;
