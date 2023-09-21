import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Card({
	Category: category = '',
	ID: id = '',
	CreatedAt: createdAt = '',
	Status: status = '',
	Description: description = '',
	Data: data = {},
	Type: issueType = '',
}) {
	const { Attachment: attachment = [] } = data || {};
	const fileUrl = attachment[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.basic_info}>
					<div className={styles.feedback_number}>
						#
						{id}
					</div>
					<div className={styles.file_status}>
						{fileUrl && (
							<Button
								size="md"
								themeType="linkUi"
								id={styles.attachment}
								onClick={() => window.open(fileUrl)}
							>
								Attachment
							</Button>
						)}
						<div className={styles.status}>{startCase(status)}</div>
					</div>
				</div>

				<div className={styles.category}>{category}</div>
				<div className={styles.issue_type}>{issueType}</div>
			</div>

			<div className={styles.desc_info}>
				<div className={styles.date}>
					{formatDate({
						date       : createdAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
						separator  : ', ',
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'dateTime',
					})}

				</div>
				<div className={styles.description}>{description}</div>
			</div>
		</div>
	);
}

export default Card;
