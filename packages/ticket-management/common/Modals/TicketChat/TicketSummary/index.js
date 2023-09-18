import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { PRIORITY_MAPPING, STATUS_LABEL_MAPPING, STATUS_MAPPING } from '../../../../constants';
import useGetCountdown from '../../../../hooks/useGetCountdown';
import TicketLoader from '../../../TicketStructure/TicketStructureLoader';

import styles from './styles.module.css';

function TicketSummary({
	Ticket: ticket = {}, ClosureAuthorizers: closureAuthorizers = false, TicketUser: ticketUser = {},
	TicketReviewer: ticketReviewer = {}, IsCurrentReviewer: isCurrentReviewer = false,
	TicketStatus: ticketStatus = '', AgentName: agentName = '',
	detailsLoading = false,
}) {
	const {
		Name: name = '', Email: email = '', MobileCountryCode: mobileCountryCode = '',
		MobileNumber: mobileNumber = '',
	} = ticketUser || {};

	const {
		ID: id = '',
		Tat: tat = '',
		Type: type = '',
		Status: status = '',
		UpdatedAt: updatedAt = '',
		CreatedAt: createdAt = '',
		Priority: priority = '',
		Source: source = '',
		Data: data = {},
	} = ticket || {};

	const {
		SerialID: serialId,
		Service: service,
		TradeType: tradeType,
		RequestType: requestType,
	} = data || {};

	const authorizers = (closureAuthorizers || []).map((item) => item.Name);

	const { color: textColor, label } =	STATUS_LABEL_MAPPING[STATUS_MAPPING[ticketStatus]] || {};

	const isSameName = agentName === name;

	const isTicketExpired = new Date(tat) > new Date();

	const endDate = new Date(tat);

	const formattedTime = useGetCountdown({ time: endDate });

	if (detailsLoading) {
		return <TicketLoader count={1} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Ticket Summary</div>
				<div className={cl`${styles.priority} ${styles[PRIORITY_MAPPING[priority]]}`}>
					{startCase(`${priority} priority`)}
				</div>
			</div>
			<div className={styles.ticket_body}>
				<div className={styles.ticket_header}>
					<div className={styles.ticket_timer}>
						<div className={styles.ticket_id}>
							#
							{id}
						</div>
						{isCurrentReviewer && isTicketExpired ? (
							<Tooltip content="Ticket escalation time" placement="right">
								<div className={styles.timer}>
									<IcCWaitForTimeSlots />
									{formattedTime}
								</div>
							</Tooltip>
						) : <div className={styles.escalation_label}>Already Escalated</div>}
					</div>
					<div className={styles.description}>{type}</div>
				</div>
				<div className={styles.ticket_status}>
					<div style={{
						color: textColor || '#000',
					}}
					>
						{label || status}

					</div>
					<div className={styles.updated_at}>
						{formatDate({
							date       : createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
			</div>

			<div className={styles.summary}>
				<div className={styles.ticket_data}>
					Source:
					<span className={styles.updated_at}>{startCase(source)}</span>
				</div>
				<div className={styles.ticket_data}>
					{status === 'closed' ? 'Resolved on' : 'Created on'}
					<span className={styles.updated_at}>
						{formatDate({
							date       : status === 'closed' ? updatedAt : createdAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</span>
				</div>
				{agentName && (
					<div className={styles.ticket_data}>
						Created by:
						<span className={styles.updated_at}>
							{agentName}
						</span>
					</div>
				)}
				{name && !isSameName && (
					<div className={styles.ticket_data}>
						On behalf of:
						<span className={styles.updated_at}>
							{name}
						</span>
					</div>
				)}
				<div className={styles.ticket_data}>
					Email:
					<span className={styles.updated_at}>
						{email}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Contact no:
					<span className={styles.updated_at}>
						{mobileCountryCode}
						{' '}
						{mobileNumber}
					</span>
				</div>
				{requestType && (
					<div className={styles.ticket_data}>
						Request Type:
						<span className={styles.updated_at}>
							{startCase(requestType)}
						</span>
					</div>
				)}
				{serialId && (
					<div className={styles.ticket_data}>
						SID:
						<span className={styles.updated_at}>
							{serialId}
						</span>
					</div>
				)}
				{service && (
					<div className={styles.ticket_data}>
						Service:
						<span className={styles.updated_at}>
							{startCase(service)}
						</span>
					</div>
				)}
				{tradeType && (
					<div className={styles.ticket_data}>
						Trade Type:
						<span className={styles.updated_at}>
							{startCase(tradeType)}
						</span>
					</div>
				)}
				<div className={styles.ticket_data}>
					Assigned to:
					<span className={styles.updated_at}>
						{ticketReviewer?.User?.Name}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Closure authorizers:
					<span className={styles.updated_at}>
						{authorizers.map((item) => item).join(', ') || '-'}
					</span>
				</div>
			</div>
		</div>
	);
}

export default TicketSummary;
