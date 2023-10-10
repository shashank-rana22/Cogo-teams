import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { STATUS_MAPPING, getStatusLabelMapping } from '../../../constants';
import ResolveRequest from '../../ResolveRequest';
import TicketActions from '../../TicketActions';

import styles from './styles.module.css';

const DESCRIPTION_LAST_ELEMENT = 100;

function TicketStructureBody({
	data = {},
	updateLoading = false,
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
		Data: ticketData = {},
	} = data;

	const { t } = useTranslation(['myTickets']);

	const [showResolveRequest, setShowResolveRequest] = useState(false);

	const { color: textColor, label } =	getStatusLabelMapping({ t })?.[STATUS_MAPPING[ticketStatus]] || {};

	const { RequestType: request_type } = ticketData || {};

	const handleTicket = (e, { actionType }) => {
		e.stopPropagation();
		updateTicketActivity({ actionType, id });
	};

	return (
		<div className={styles.ticket_container}>
			<div className={styles.subcontainer_one}>
				<div className={styles.subcontainer_header}>
					<div className={styles.info}>
						<div className={styles.ticket_id}>
							#
							{id}
						</div>
						<div className={styles.request_type}>
							{startCase(request_type)}
						</div>
					</div>

					<TicketActions
						id={id}
						layerAction
						isModal={false}
						ticketStatus={ticketStatus}
						handleTicket={handleTicket}
						isClosureAuthorizer={isClosureAuthorizer}
						setShowResolveRequest={setShowResolveRequest}
					/>
				</div>
			</div>

			<div className={styles.ticket_view} role="presentation" onClick={() => setModalData({ ticketId: id })}>
				<div className={styles.ticket_type}>
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

			{showResolveRequest && (
				<ResolveRequest
					ticketId={id}
					updateLoading={updateLoading}
					showResolveRequest={showResolveRequest}
					setShowResolveRequest={setShowResolveRequest}
					updateTicketActivity={updateTicketActivity}
				/>
			)}
		</div>
	);
}

export default TicketStructureBody;
