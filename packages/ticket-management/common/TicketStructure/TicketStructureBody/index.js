import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { statusLabelTransformation } from '../../../configurations/key-mapping';
import { actionButtonKeys, STATUS_MAPPING } from '../../../constants';

import styles from './styles.module.css';

function TicketStructureBody({
	data,
	updateTicketActivity = () => {},
}) {
	const {
		ID: id = '',
		Status: status = '',
		Description: description = '',
		CreatedAt: createdAt = '',
		TicketActivity: ticketActivity = {},
		Type: type = '',
		ActivityCount: activityCount = 0,
	} = data;

	const { color: textColor, label } =	statusLabelTransformation[STATUS_MAPPING[status]] || {};

	const handleTicketClick = (e) => {
		e.stopPropagation();
		updateTicketActivity(actionButtonKeys[status]?.name, id);
	};

	return (
		<div
			className={styles.ticket_container}
		>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.ticket_id}>
						#
						{id}
					</div>

					<div
						role="presentation"
						className={styles.reopen_resolve}
						onClick={(e) => handleTicketClick(e)}
					>
						{actionButtonKeys[status]?.label || ''}
					</div>
				</div>
				<div className={styles.category_ticket_activity}>
					{type || description.substring(0, 100)}
				</div>
			</div>
			<div className={styles.subcontainer_two}>
				<div className={styles.subcontainer_header}>
					<div
						className={styles.ticket_status}
						style={{
							color: textColor || '#ABCD62',
						}}
					>
						{label}
					</div>
					<div className={styles.ticket_date_time}>
						{formatDate({
							date       : createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
				<div className={styles.ticket_reason_box}>
					<div className={styles.description}>
						{(ticketActivity?.description || description).substring(0, 100)}
					</div>
					{activityCount ? (
						<div className={styles.activity_count}>
							{activityCount}
						</div>
					) : null}

				</div>
			</div>
		</div>
	);
}

export default TicketStructureBody;
