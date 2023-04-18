import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const RESULT_MAPPING = {
	passed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg',
		message   : 'Congratulations!',
		alt       : 'confetti',
	},
	failed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sad-face.svg',
		message   : 'Well Done!',
		alt       : 'sad-face',
	},
	intermediate: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/sad-face.svg',
		message   : 'You could do Better!',
		alt       : 'sad-face',
	},
};

function TestResultMessage({ stats_data }) {
	const { date, status, test_name } = stats_data || {};

	const { image_url, message, alt, color } = RESULT_MAPPING[status] || {};

	return (
		<div className={styles.message_container}>
			<Image
				src={image_url}
				alt={alt}
				className={styles.image_container}
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
					{format(date, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
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
