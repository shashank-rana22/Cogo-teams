import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toFixed from '../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';

function Overview() {
	const {
		user: { id },
	} = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const [{ data }] = useRequest({
		method : 'GET',
		url    : '/get_passed_test_data_per_user',
		params : {
			id,
		},
	}, { manual: false });

	const response = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Overview
			</div>

			<div className={styles.content_container}>
				<div className={styles.content}>
					<div className={styles.text}>Tests Given</div>
					<div className={styles.value}>
						{response.total_passed_test_count || 0}
						/
						{response.total_test_count || 0}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Tests Cleared</div>
					<div className={styles.value}>
						{response.total_passed_test_count || 0}
						/
						{response.total_test_count || 0}
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.text}>Avg Percentile</div>
					<div className={styles.value}>
						{+toFixed(response.average_percentile, 2)}
						{' '}
						%
					</div>
				</div>
			</div>
		</div>

	);
}

export default Overview;
