import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TestResultMessage({ stats_data }) {
	const {
		profile: { user: { name } },
	} = useSelector((state) => state);

	const { date, status, test_name } = stats_data || {};

	const hasPassed = status === 'passed';

	return (
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
	);
}

export default TestResultMessage;
