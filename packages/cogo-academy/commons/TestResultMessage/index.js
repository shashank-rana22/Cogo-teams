import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';
import { format } from '@cogoport/utils';

import ResultText from './ResultText';
import styles from './styles.module.css';

const getUserStatus = ({ cut_of_percentage, user_percentage }) => {
	if (user_percentage < cut_of_percentage) {
		return 'failed';
	} if (user_percentage > (100 - ((100 - cut_of_percentage) / 2))) {
		return 'passed';
	}
	return 'intermediate';
};

const RESULT_MAPPING = {
	passed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile1.png',
		message   : 'Congratulations!',
		alt       : 'confetti',
	},
	intermediate: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile2.png',
		message   : 'Well Done!',
		alt       : 'smile',
	},
	failed: {
		image_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/smile3.png',
		message   : 'You could do Better!',
		alt       : 'sad-face',
	},

};

function TestResultMessage({ stats_data }) {
	const { date, test_name, cut_of_percentage, user_percentage } = stats_data || {};

	const status = getUserStatus({ cut_of_percentage, user_percentage });

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
					<ResultText
						type={status}
						date={format(date, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
						testName={test_name}
					/>

				</div>
			</div>
		</div>
	);
}

export default TestResultMessage;
