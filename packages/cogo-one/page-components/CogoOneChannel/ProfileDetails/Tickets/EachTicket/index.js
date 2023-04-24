import { Tooltip, cl } from '@cogoport/components';

import ReceiveDiv from '../../../../../common/ReceiveDiv';
import { TICKET_ACTIVITY_MAPPING } from '../../../../../constants';

import styles from './styles.module.css';

function EachTicket({
	eachTicket = {},
	createTicketActivity = () => {},
}) {
	const {
		Data: { InvoiceNumber = 0, Message = '' } = {},
		CreatedAt = '',
		TicketActivityDescription = '',
		Priority = '',
		Status = '',
		ID = '',
	} = eachTicket || {};

	const eachMessage = {
		message_type : 'text',
		created_at   : CreatedAt,
		response     : {
			message: Message,
		},
	};
	const handleTicketActivity = ({ type = '', status = '' }) => {
		const payload = {
			TicketID : [Number(ID)],
			Type     : type,
			Status   : status,
		};
		createTicketActivity(payload);
	};
	const activityMapping = TICKET_ACTIVITY_MAPPING[Status === 'closed' ? 'closed' : 'open'] || [];
	return (
		<div
			className={cl`${styles.message_content}
			${Status === 'closed' ? styles.closed_message_content : ''}
			${!Message?.trim() ? styles.no_message : ''}
			`}
			key={ID}
		>
			<div className={styles.header}>
				<div>
					{InvoiceNumber ? (
						<div
							className={cl`${styles.details_div} 
							${Status === 'closed' ? styles.closed_details : ''}`}
						>
							Invoice ID:
							<span>{InvoiceNumber}</span>
						</div>
					) : null}
				</div>
				<div className={styles.activity}>
					{activityMapping.map(({
						tooltipContent = '',
						activityPayload = {},
						icon:Icon,
						iconStyles = {},
					}) => (
						Icon && (
							<Tooltip placement="bottom" content={tooltipContent}>
								<Icon
									{...iconStyles}
									className={styles.icon_styles}
									onClick={() => handleTicketActivity(activityPayload)}
								/>
							</Tooltip>
						)
					))}
				</div>
			</div>
			{Message && (
				<div className={styles.overflow_div}>
					<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
				</div>
			)}
			<div
				className={Status === 'closed' ? styles.ticket_details_close : styles.ticket_details}
			>
				<div className={styles.ticket_status}>
					<div className={styles.ticket_priority}>{Status}</div>
					<div className={styles.ticket_priority}>{Priority}</div>
				</div>
				<div className={styles.ticket_description}>
					{TicketActivityDescription}
				</div>
			</div>
		</div>
	);
}
export default EachTicket;
