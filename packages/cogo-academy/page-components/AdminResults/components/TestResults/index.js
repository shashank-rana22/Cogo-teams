import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function TestResults({ test_id }) {
	const {
		profile: { user: { id: user_id } },
	} = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			test_id,
			user_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	console.log(stats_data, 'stats_data');

	const { test_name } = stats_data;

	return (
		<div className={styles.container}>
			<div>{test_name}</div>
		</div>
	);
}

export default TestResults;
