import { Button } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function Card() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.basic_info}>
					<div className={styles.feedback_number}>#123</div>
					<Button
						size="md"
						themeType="linkUi"
						id={styles.attachment}
						// onClick={() => window.open()}
					>
						Attachment
					</Button>
				</div>

				<div className={styles.category}>category</div>
				<div className={styles.issue_type}>issue_type</div>
			</div>

			<div className={styles.desc_info}>
				<div className={styles.date}>
					{/* {formatDate({
						date       : createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
						separator  : ', ',
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'dateTime',
					})} */}
					date
				</div>
				<div className={styles.desc}>desc</div>
			</div>
		</div>
	);
}

export default Card;
