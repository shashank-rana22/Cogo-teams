import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const RESULT_MAPPING = {
	passed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg',
		message   : 'Congratulations',
		alt       : 'confetti',
		color     : '#849e4c',
	},
	failed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sad-face.svg',
		message   : 'Unfortunately, you have not been able to clear the test',
		alt       : 'sad-face',
		color     : '#BF291E',
	},
};

function TestResultMessage({ stats_data }) {
	const { date, status, test_name } = stats_data || {};

	const { image_url, message, alt, color } = RESULT_MAPPING[status];

	return (
		<div className={styles.message_container}>
			<img
				src={image_url}
				alt={alt}
				style={{ marginRight: 20 }}
				width={42}
				height={42}
			/>

			<div className={styles.column}>
				<div className={styles.message_content} style={{ color }}>
					{message}
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

				{status === 'failed' ? (
					<div className={styles.sub_text}>
						Prepare well and try again in a few days.
					</div>
				) : null}
			</div>
		</div>
	);
}

export default TestResultMessage;
