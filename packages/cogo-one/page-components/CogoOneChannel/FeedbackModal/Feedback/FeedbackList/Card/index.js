import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { STATUS_LABEL_MAPPING, FEEDBACK_STATUS_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function Card({
	Category: category = '',
	ID: id = '',
	CreatedAt: createdAt = '',
	Status: status = '',
	Description: description = '',
	Data: data = {},
	IsUrgent: isUrgent = false,
	Type: issueType = '',
	setModalData = () => {},
}) {
	const { Attachment: attachment = [] } = data || {};

	const fileUrl = attachment?.[GLOBAL_CONSTANTS.zeroth_index];

	const { value, label } = STATUS_LABEL_MAPPING[FEEDBACK_STATUS_MAPPING[status]] || {};

	return (
		<div
			role="presentation"
			className={styles.card}
			onClick={() => setModalData({ ticketId: id })}
		>
			<div className={styles.header}>
				<div className={styles.category}>{category}</div>

				<div className={styles.basic_info}>
					<div className={styles.feedback_number}>
						#
						{id}
					</div>
					<div
						className={cl`${styles.status} ${styles[value]}`}
					>
						{startCase(label)}

					</div>
				</div>
			</div>

			<div className={styles.desc_info}>
				<div className={styles.issue_type}>{issueType}</div>

				<div className={styles.description}>{description}</div>

				<div className={styles.footer}>

					<div className={styles.date}>
						{isUrgent ? <div className={styles.critical}>Critical</div> : null}
						{formatDate({
							date       : createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>

					<div>
						{fileUrl ? (

							<Button
								size="md"
								themeType="link"
								id={styles.attachment}
								onClick={(e) => {
									e.stopPropagation();
									window.open(fileUrl);
								}}
							>
								<IcMDocument className={styles.document_icon} />
								Attachment
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
