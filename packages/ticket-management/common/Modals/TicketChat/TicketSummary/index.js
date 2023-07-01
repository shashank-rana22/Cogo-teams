import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { PRIORITY_MAPPING, STATUS_LABEL_MAPPING } from '../../../../constants';
import getTicketStatus from '../../../../utils/getTicketStatus';

import styles from './styles.module.css';

function TicketSummary({
	Ticket: ticket = {}, ClosureAuthorizers: closureAuthorizers, TicketUser: ticketUser, TicketReviewer: ticketReviewer,
}) {
	const {
		ID: id = '',
		Type: type = '',
		Status: status = '',
		UpdatedAt: updatedAt = '',
		CreatedAt: createdAt = '',
		Priority: priority = '',
	} = ticket || {};

	const authorizers = (closureAuthorizers || []).map((item) => item.Name);

	const { label = '' } = STATUS_LABEL_MAPPING[getTicketStatus(status)] || {};

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
					<div className={styles.ticket_id}>
						#
						{id}
					</div>
					<div className={styles.description}>{type}</div>
				</div>
				<div className={styles.ticket_status}>
					<div>{label || status}</div>
					<div className={styles.updated_at}>
						{formatDate({
							date       : updatedAt,
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
					{`${status === 'closed' ? 'Resolved on' : 'Created on'}`}
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
				<div className={styles.ticket_data}>
					Created By:
					<span className={styles.updated_at}>
						{ticketUser?.Name}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Email:
					<span className={styles.updated_at}>
						{ticketUser?.Email}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Contact no:
					<span className={styles.updated_at}>
						{ticketUser?.MobileCountryCode}
						{' '}
						{ticketUser?.MobileNumber}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Source:
					<span className={styles.updated_at}>{startCase(ticketUser?.Type)}</span>
				</div>
				<div className={styles.ticket_data}>
					Assigned To:
					<span className={styles.updated_at}>
						{ticketReviewer?.User?.Name}
					</span>
				</div>
				<div className={styles.ticket_data}>
					Closure Authorizers:
					<span className={styles.updated_at}>
						{authorizers.map((item) => item).join(', ') || '-'}
					</span>
				</div>
			</div>
		</div>
	);
}

export default TicketSummary;
