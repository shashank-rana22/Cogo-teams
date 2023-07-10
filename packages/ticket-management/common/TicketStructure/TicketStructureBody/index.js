import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { STATUS_LABEL_MAPPING, STATUS_MAPPING } from '../../../constants';
import TicketActions from '../../TicketActions';

import styles from './styles.module.css';

const DESCRIPTION_LAST_ELEMENT = 100;

function TicketStructureBody({
	data = {},
	updateTicketActivity = () => {},
	setModalData = () => {},
}) {
	const {
		ID: id = '',
		Description: description = '',
		CreatedAt: createdAt = '',
		TicketActivity: ticketActivity = {},
		Type: type = '',
		ActivityCount: activityCount = 0,
		IsClosureAuthorizer: isClosureAuthorizer = false,
		TicketStatus: ticketStatus = '',
	} = data;

	const { color: textColor, label } =	STATUS_LABEL_MAPPING[STATUS_MAPPING[ticketStatus]] || {};

	const handleTicket = (e, { actionType }) => {
		e.stopPropagation();
		updateTicketActivity({ actionType, id });
	};

	return (
		<div
			role="presentation"
			className={styles.ticket_container}
			onClick={() => setModalData({ ticketId: id })}
		>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.ticket_id}>
						#
						{id}
					</div>
					<TicketActions
						isModal={false}
						ticketStatus={ticketStatus}
						handleTicket={handleTicket}
						isClosureAuthorizer={isClosureAuthorizer}
					/>
				</div>
				<div className={styles.category_ticket_activity}>
					{type || description.substring(GLOBAL_CONSTANTS.zeroth_index, DESCRIPTION_LAST_ELEMENT)}
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
						{(ticketActivity?.Description
							|| description).substring(GLOBAL_CONSTANTS.zeroth_index, DESCRIPTION_LAST_ELEMENT)}
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
