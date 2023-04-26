import { Tooltip, cl } from '@cogoport/components';
import { IcMSpecificUsers } from '@cogoport/icons-react';

import ReceiveDiv from '../../../../../common/ReceiveDiv';
import { PRIORITY_MAPPING } from '../../../../../constants';
import getTicketActivityMapping from '../../../../../utils/getTicketActivityMapping';

import styles from './styles.module.css';

function EachTicket({
	eachTicket = {},
	createTicketActivity = () => {},
	agentId = '',
	handleCardClick,
}) {
	const {
		Data: { InvoiceNumber = 0, Message = '', ShipmentId = 0, AdditionalData = '' } = {},
		CreatedAt = '',
		TicketActivityDescription = '',
		Priority = '',
		Status = '',
		ID = '',
		Type = '',
		Description = '',
		TicketReviewerID = '',
		ReviewerName = '',
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

	const DATA_MAPPING = [
		{ title: 'INVOICE NUMBER', value: InvoiceNumber },
		{ title: 'SHIPMENT ID', value: ShipmentId },
		{ title: 'ADDITIONAL DATA', value: AdditionalData },
	];

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
				<div
					role="button"
					tabIndex={0}
					onClick={() => handleCardClick(ID)}
					className={cl`${styles.details_div} 
							${Status === 'closed' ? styles.closed_details : ''}`}
				>
					{`Ticket ID: ${ID}`}
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
					)) : <div className={styles.not_authorized_styles}>REQUESTED</div>}
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
				<div className={styles.closure_authoriser}>
					<IcMSpecificUsers className={styles.specific_user_icon} />
					<div className={styles.reviewer_name}>{ReviewerName}</div>
				</div>
				<div>
					{DATA_MAPPING.map(({ title = '', value = '' }) => (
						value ? (
							<div className={styles.header_value}>
								{title}
								:
								<span>{value}</span>
							</div>
						) : null
					))}
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
