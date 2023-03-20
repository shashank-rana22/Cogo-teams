import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import Percentile from './Percentile';
import QuestionWiseStats from './QuestionWiseStats';
import styles from './styles.module.css';
import TopicWisePercentile from './TopicWisePercentile';

function LastTestResults() {
	const { profile: { user } } = useSelector((profile) => profile);

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_user_performance',
		params : {
			uers_id: user.id,
		},
	}, { manual: false });

	return (
		<div className={styles.container}>
			<div className={styles.message_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg"
					alt="confetti"
					style={{ marginRight: 20 }}
				/>

				<div className={styles.message_content}>
					Congratulations
					<span className={styles.name}>
						{user.name}
						!
					</span>
				</div>
			</div>

			<div className={styles.stats}>
				<Percentile />
				<TopicWisePercentile />
				<QuestionWiseStats />
			</div>
		</div>
	);
}

export default LastTestResults;
