import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TestResultMessage({ stats_data }) {
	const { date, status, test_name } = stats_data || {};

	const hasPassed = status === 'passed';

	const image_url = hasPassed
		? 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg'
		: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sad-face.svg';

	return (
		<div className={styles.message_container}>
			<img
				src={image_url}
				alt="confetti"
				style={{ marginRight: 20 }}
				width={42}
				height={42}
			/>

			<div className={styles.column}>
				<div className={styles.message_content} style={{ color: hasPassed ? '#849e4c' : '#BF291E' }}>
					{hasPassed ? 'Congratulations' : 'Unfortunately, you have not been able to clear the test'}
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
					{format(date, 'dd MMM yyyy')}
				</div>

				{!hasPassed ? (
					<div className={styles.sub_text}>
						Prepare well and try again in a few days.
					</div>
				) : null}
			</div>
		</div>
	);
}

export default TestResultMessage;
