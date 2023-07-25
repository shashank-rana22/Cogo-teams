import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSpecificUsers } from '@cogoport/icons-react';

import ReceiveDiv from '../../../../../common/ReceiveDiv';
import { PRIORITY_MAPPING } from '../../../../../constants';
import getTicketActivityMapping from '../../../../../utils/getTicketActivityMapping';

import styles from './styles.module.css';

function EachTicket({
	eachTicket = {},
	createTicketActivity = () => {},
	agentId = '',
	handleCardClick = () => {},
}) {
	const {
		Data: {
			InvoiceNumber = 0,
			MessageData: {
				Message = '',
				MediaUrl = '',
				MessageType = '',
				CreatedAt: messageCreatedAt = '',
			} = {},
			ShipmentId = 0,
			AdditionalData = '',
		} = {},
		CreatedAt = '',
		TicketActivity:{ Description:ticketActivityDescription = '' } = {},
		Priority = '',
		Status = '',
		ID = '',
		Type = '',
		Description = '',
		TicketReviewerID = '',
		ReviewerName = '',
	} = eachTicket || {};

	const date = CreatedAt
		? formatDate({
			date       : CreatedAt,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM YYYY'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
			formatType : 'dateTime',
			separator  : ', ',
		}) : '';

	const handleTicketActivity = ({ type = '', status = '' }) => {
		const payload = {
			TicketID : [Number(ID)],
			Type     : type,
			Status   : status,
		};
		createTicketActivity(payload);
	};

	const DATA_MAPPING = [
		{ title: 'RAISED ON', value: date },
		{ title: 'INVOICE NO', value: InvoiceNumber },
		{ title: 'SHIPMENT ID', value: ShipmentId },
		{ title: 'ADDITIONAL DATA', value: AdditionalData },
	];

	const {
		actions = [],
		requestedText = '',
		canPerformActions = '',
		iconUrl = '',
	} = getTicketActivityMapping({
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
					role="presentation"
					onClick={() => handleCardClick(ID)}
					className={cl`${styles.details_div} 
							${Status === 'closed' ? styles.closed_details : ''}`}
				>
					{`#${ID}`}
				</div>
				<div className={styles.activity}>
					{canPerformActions
						? (actions.map(({
							tooltipContent = '',
							activityPayload = {}, icon: Icon, iconStyles = {},
						}) => Icon && (
							<Tooltip
								key={tooltipContent}
								placement="bottom"
								content={tooltipContent}
							>
								<Icon
									{...iconStyles}
									className={styles.icon_styles}
									onClick={() => handleTicketActivity(activityPayload)}
								/>
							</Tooltip>
						))
						) : (
							<div className={styles.not_authorized_styles}>
								REQUESTED
							</div>
						)}
				</div>
			</div>
			{Message ? (
				<div className={styles.message_container}>
					<ReceiveDiv
						eachMessage={{
							message_type : MessageType,
							created_at   : messageCreatedAt,
							response     : {
								message   : Message,
								media_url : MediaUrl,
							},
						}}
						canRaiseTicket={false}
					/>
				</div>
			) : (
				<div className={styles.desc_container}>
					<div className={styles.desc_title}>Description</div>
					<div className={styles.description}>{Description}</div>
				</div>
			)}
			<div
				className={cl`${styles.ticket_details} ${Status === 'closed' ? styles.ticket_details_close : ''}`}
			>
				<div className={styles.type_styles}>{Type}</div>
				<div className={styles.ticket_status}>
					<div className={styles.ticket_priority}>
						{iconUrl && (
							<img
								src={iconUrl}
								alt={requestedText}
								className={styles.img_styles}
							/>
						)}
						<div>{requestedText}</div>
					</div>
					<div
						className={styles.priority_dot}
						style={{
							'--background-color':
                                PRIORITY_MAPPING[Priority] || '#F68B21',
						}}
					>
						{Priority?.toUpperCase()}
					</div>
				</div>
				<div className={styles.closure_authoriser}>
					<IcMSpecificUsers className={styles.specific_user_icon} />
					<div className={styles.reviewer_name}>{ReviewerName}</div>
				</div>
				<div>
					{DATA_MAPPING.map(({ title = '', value = '' }) => (value ? (
						<div key={title} className={styles.header_value}>
							{title}
							:
							<span>{value}</span>
						</div>
					) : null))}
				</div>
				{ticketActivityDescription && (
					<div className={styles.description}>
						{ticketActivityDescription}
					</div>
				)}
			</div>
		</div>
	);
}
export default EachTicket;
