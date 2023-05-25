import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { statusLabelTransformation } from '../../../../../configurations/key-mapping';
import { getTicketStatus } from '../../../../../constants';

import styles from './styles.module.css';

function TicketSummary({ ticketData = {} }) {
	const {
		Ticket: { ID = '', Type = '', Status = '', UpdatedAt, CreatedAt } = {},
	} = ticketData;

	const { label = '' } = statusLabelTransformation[getTicketStatus(Status)] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Ticket Summary</div>
			<div className={styles.ticket_body}>
				<div className={styles.ticket_header}>
					<div className={styles.ticket_id}>
						#
						{ID}
					</div>
					<div className={styles.description}>{Type}</div>
				</div>
				<div className={styles.ticket_status}>
					<div>{label || Status}</div>
					<div className={styles.updated_at}>
						{formatDate({
							date       : UpdatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
							separator  : ', ',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
			</div>

			<div className={styles.ticket_data}>
				{Status === 'closed' ? 'resolved' : 'created'}
				{' '}
				on:
				{' '}
				<span className={styles.updated_at}>
					{formatDate({
						date       : Status === 'closed' ? UpdatedAt : CreatedAt,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/mm/yyyy'],
						separator  : ', ',
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'dateTime',
					})}
				</span>
			</div>
		</div>
	);
}

export default TicketSummary;
