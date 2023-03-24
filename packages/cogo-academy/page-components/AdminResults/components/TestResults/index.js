import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, isEmpty } from '@cogoport/utils';

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

	console.log(stats_data, 'stats_data');

	// if (isEmpty(stats_data)) {
	// 	return null;
	// }

	if (loading) {
		return 'loading';
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
