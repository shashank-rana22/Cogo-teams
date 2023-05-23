// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
// import formatDate from '@cogoport/globalization/utils/formatDate';

// import {
// 	actionButtonKeys,
// 	statusLabelTransformation,
// } from '../../../configurations/key-mapping';
// import getTicketStatus from '../../../utils/getTicketStatus';

import styles from './styles.module.css';

function TicketStructureBody() {
	// const {
	// 	ID = '',
	// 	Status = '',
	// 	Description = '',
	// 	CreatedAt = '',
	// 	TicketActivity = {},
	// 	Type = '',
	// 	Activitycount = 0,
	// } = item;

	// const { t } = useTranslation(['common']);

	// const { color: textColor, label = '' } =		statusLabel[getTicketStatus(Status)] || {};

	// const handleTicketClick = (e) => {
	// 	e.stopPropagation();
	// 	updateTicketActivity(actionButton[Status]?.name, ID);
	// };

	// const handleTicket = () => {
	// 	if (listType === 'create') {
	// 		const currentUrl = window.location.href;
	// 		const newUrl = `${currentUrl
	// 			.split('?')?.[0]
	// 			.replace(/\/$/, '')}?ticketId=${ID}`;
	// 		window.open(newUrl, '_blank', 'noreferrer');
	// 	}
	// 	setModalData({
	// 		type     : 'ticket_details',
	// 		ticketId : ID,
	// 	});
	// };

	return (
		<div
			// onClick={handleTicket}
			// role="presentation"
			className={styles.ticket_container}
		>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.ticket_id}>
						#
						{/* {ID} */}
						222222
					</div>
					{/* {listType !== 'create' && ( */}
					<div
						role="presentation"
						className={styles.reopen_resolve}
					>
						{/* {actionButton[Status]?.label || ''} */}
						reopen
					</div>

				</div>
				<div className={styles.category_ticket_activity}>
					{/* {Type || Description.substring(0, 100)} */}
					Hello, I am calling to take confirmation of my shipment de...
				</div>
			</div>
			<div className={styles.subcontainer_two}>
				<div className={styles.subcontainer_header}>
					<div
						className={styles.ticket_status}
						// style={{
						// 	color: textColor || '#F68B21',
						// }}
					>
						{/* {label} */}
						Open
					</div>
					<div className={styles.ticket_date_time}>
						{/* {formatDate({
							date       : CreatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})} */}
						12/2/23   11:19
					</div>
				</div>
				<div className={styles.ticket_reason_box}>
					<div className={styles.description}>
						{/* {(TicketActivity?.Description || Description).substring(0, 100)} */}
						This issue occurred...
					</div>
					{/* {Activitycount ? ( */}
					<div className={styles.messages_nos}>
						{/* {Activitycount} */}
						2
					</div>

				</div>
			</div>
		</div>
	);
}

export default TicketStructureBody;
