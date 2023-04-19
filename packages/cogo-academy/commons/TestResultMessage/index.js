import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getUserStatus = ({ cut_of_percentage, user_percentage }) => {
	if (user_percentage < cut_of_percentage) {
		return 'failed';
	}

	if (user_percentage > (100 - ((100 - cut_of_percentage) / 2))) {
		return 'passed';
	}

	return 'intermediate';
};

const RESULT_MAPPING = {
	passed: {
		image_url        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile1.png',
		message          : 'Congratulations!',
		alt              : 'confetti',
		message_text     : 'You have performed really well in the',
		message_sub_text : `. Your hard work has paid off, and we encourage you to continue
		learning and applying your newfound knowledge to future transactions.
		Keep up the excellent work!`,
	},
	intermediate: {
		image_url        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile2.png',
		message          : 'Well Done!',
		alt              : 'smile',
		message_text     : 'Your performance on the',
		message_sub_text : `showed Potential for Improvement. Keep working hard and striving for
		better results in future tests - we believe in your ability to succeed!`,
	},
	failed: {
		image_url        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile3.png',
		message          : 'You could do Better!',
		alt              : 'sad-face',
		message_text     : 'While your performance on the',
		message_sub_text : `was Not as Strong as we had Hoped, don't get discouraged!
		Remember that learning takes time and practice. We recommend dedicating
		more time to studying and look forward to seeing your progress on the
		next test. Keep up the effort!`,
	},
};

function TestResultMessage({ stats_data }) {
	const { date, test_name, cut_of_percentage, user_percentage } = stats_data || {};

	const status = getUserStatus({ cut_of_percentage, user_percentage });

	const { image_url, message, alt, message_text, message_sub_text } = RESULT_MAPPING[status] || {};

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
				<div className={styles.message_content}>
					{message}
				</div>

				<div className={styles.sub_text}>
					{message_text}
					{' '}
					<b>{startCase(test_name)}</b>
					{' '}
					taken on
					{' '}
					{format(date, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
					{' '}
					{message_sub_text}
				</div>
			</div>
		</div>
	);
}

export default TestResultMessage;
