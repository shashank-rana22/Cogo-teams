import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useSelector } from '@cogoport/store';

import { statusLabelTransformation } from '../../../configurations/key-mapping';
import { actionButtonKeys, getTicketStatus } from '../../../constants';

import styles from './styles.module.css';

function TicketStructureBody({
	data,
	updateTicketActivity = () => {},
}) {
	const {
		ID = '',
		Status = '',
		Description = '',
		CreatedAt = '',
		TicketActivity = {},
		Type = '',
		ActivityCount = 0,
		TicketReviewerID = '',
	} = data;

	const { profile } = useSelector((state) => state);
	const { color: textColor, label } =	statusLabelTransformation[getTicketStatus(Status)] || {};
	const handleTicketClick = (e) => {
		e.stopPropagation();
		updateTicketActivity(actionButtonKeys[Status]?.name, ID);
	};

	return (
		<div
			className={styles.ticket_container}
		>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.ticket_id}>
						#
						{ID}
					</div>

					{(profile?.user?.id === TicketReviewerID) && (
						<div
							role="presentation"
							className={styles.reopen_resolve}
							onClick={(e) => handleTicketClick(e)}
						>
							{actionButtonKeys[Status]?.label || ''}
						</div>
					)}
				</div>
				<div className={styles.category_ticket_activity}>
					{Type || Description.substring(0, 100)}
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
							date       : CreatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
				<div className={styles.ticket_reason_box}>
					<div className={styles.description}>
						{(TicketActivity?.Description || Description).substring(0, 100)}
					</div>
					{ActivityCount ? (
						<div className={styles.activity_count}>
							{ActivityCount}
						</div>
					) : null}

				</div>
			</div>
		</div>
	);
}

export default TicketStructureBody;
