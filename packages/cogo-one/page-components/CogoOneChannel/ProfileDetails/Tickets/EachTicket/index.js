import { Tooltip, cl } from '@cogoport/components';

import ReceiveDiv from '../../../../../common/ReceiveDiv';
import { PRIORITY_MAPPING } from '../../../../../constants';
import getTicketActivityMapping from '../../../../../utils/getTicketActivityMapping';

import styles from './styles.module.css';

function EachTicket({
	eachTicket = {},
	createTicketActivity = () => {},
	agentId = '',
}) {
	const {
		Data: { InvoiceNumber = 0, Message = '', ShipmentId = 0 } = {},
		CreatedAt = '',
		TicketActivityDescription = '',
		Priority = '',
		Status = '',
		ID = '',
		Type = '',
		Description = '',
		TicketReviewerID = '',
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
	const headerValue = InvoiceNumber || ShipmentId;

	const headerTitle = InvoiceNumber ? 'Invoice ID' : 'Shipment ID';

	const { actions = [], requestedText = '', canPerformActions = '', iconUrl = '' } = getTicketActivityMapping({

		status                  : Status,
		canPerformRequestAction : agentId === TicketReviewerID,
	}) || [];

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
					{headerValue ? (
						<div
							className={cl`${styles.details_div} 
							${Status === 'closed' ? styles.closed_details : ''}`}
						>
							{headerTitle}
							:
							<span>{headerValue}</span>
						</div>
					) : null}
				</div>
				<div className={styles.activity}>
					{canPerformActions ? actions.map(({
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
					)) : <div className={styles.not_authorized_styles}>NOT AUTHORIZED</div>}
				</div>
			</div>
			{Message ? (
				<ReceiveDiv eachMessage={eachMessage} canRaiseTicket={false} />
			) : <div className={styles.description}>{Description}</div>}
			<div
				className={cl`${styles.ticket_details} ${Status === 'closed' ? styles.ticket_details_close : ''}`}
			>
				<div className={styles.type_styles}>
					{Type}
				</div>
				<div className={styles.ticket_status}>
					<div className={styles.ticket_priority}>
						{iconUrl && <img src={iconUrl} alt={requestedText} className={styles.img_styles} />}
						<div>{requestedText}</div>
					</div>
					<div
						className={styles.priority_dot}
						style={{ '--background-color': PRIORITY_MAPPING[Priority] || '#F68B21' }}
					>
						{Priority?.toUpperCase()}
					</div>
				</div>
				{TicketActivityDescription && (
					<div className={styles.description}>
						{TicketActivityDescription}
					</div>
				)}
			</div>
		</div>
	);
}
export default EachTicket;
