import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase, format } from '@cogoport/utils';

import QuestionWiseStats from '../../commons/QuestionWiseStats';

import GoToDetails from './GoToDetails';
import Percentile from './Percentile';
import styles from './styles.module.css';
import TopicWisePercentile from './TopicWisePercentile';

function LastTestResults() {
	const {
		profile: { user: { id: user_id, name } },

	} = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			test_id: '2b605b28-3cc1-47a7-b73e-52b8a2cb9f76',
			user_id,
		},
	}, { manual: false });

	const stats_data = data?.data || {};

	const { date, status, test_name, topic_wise_percentile } = stats_data || {};

	const hasPassed = status === 'passed';

	return (
		<div className={styles.container}>
			<div className={styles.message_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg"
					alt="confetti"
					style={{ marginRight: 20 }}
				/>

				<div className={styles.column}>
					<div className={styles.message_content} style={{ color: hasPassed ? '#849e4c' : '' }}>
						{hasPassed ? 'Congratulations' : 'Alas!'}
						<span className={styles.name}>
							{name}
							!
						</span>
					</div>

					<div className={styles.sub_text}>
						You have
						{' '}
						<b>{startCase(status)}</b>
						{' '}
						the
						{' '}
						<b>{test_name}</b>
						{' '}
						taken on
						{' '}
						{format(date, 'd MMM\' yyyy')}
					</div>
				</div>
			</div>

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
