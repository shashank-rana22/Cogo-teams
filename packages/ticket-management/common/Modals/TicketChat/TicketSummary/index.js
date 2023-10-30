import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { PRIORITY_MAPPING, STATUS_MAPPING, getStatusLabelMapping, CLOSED_TICKET_STATUS } from '../../../../constants';
import useGetCountdown from '../../../../hooks/useGetCountdown';
import { handleRouteBooking, handleRouteSupply } from '../../../../utils/handleRoute';
import TicketLoader from '../../../TicketStructure/TicketStructureLoader';

import ConfigDetails from './ConfigDetails';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

const hideTatTimer = ({ status = '', message = '' }) => {
	if (CLOSED_TICKET_STATUS.includes(status)) {
		return null;
	}
	return message;
};

function TicketSummary({
	Ticket: ticket = {}, ClosureAuthorizers: closureAuthorizers = false, TicketUser: ticketUser = {},
	TicketReviewer: ticketReviewer = {},
	TicketStatus: ticketStatus = '', AgentName: agentName = '',
	detailsLoading = false, TicketConfiguration: ticketConfiguration = {},
	OrganizationData: organizationData = {}, partnerId = '',
	shipmentsData = {}, listLoading = false, userId = '',
}) {
	const {
		Name: name = '', Email: email = '',
		MobileCountryCode: mobileCountryCode = '',
		MobileNumber: mobileNumber = '',
	} = ticketUser || {};
	const {
		Category : category = '',
		Subcategory: subCategory = '',
		RaisedByDesk: raisedByDesk = '',
		RaisedToDesk: raisedToDesk = '',
		CategoryDeskType: categoryDeskType = '',
	} = ticketConfiguration || {};

	const { ShortName: shortName = '' } = organizationData || {};

	const {
		ID: id = '', Tat: tat = '', Type: type = '',
		Status: status = '', UpdatedAt: updatedAt = '',
		CreatedAt: createdAt = '', Priority: priority = '',
		Source: source = '',
		Data: data = {}, PerformedByID: performedByID = '',
	} = ticket || {};

	const { t } = useTranslation(['myTickets']);

	const {
		SerialID: serialId, Service: service, TradeType: tradeType,
		RequestType: requestType, IDType: idType,
	} = data || {};

	const authorizers = (closureAuthorizers || []).map((item) => item.Name);

	const { color: textColor, label } = getStatusLabelMapping({ t })
		?.[STATUS_MAPPING[ticketStatus]] || {};

	const isSameName = agentName === name;
	const isCategoryConfig = categoryDeskType === 'by_category';
	const ticketReviewerName = ticketReviewer?.User?.Name || '';
	const isTicketExpired = new Date(tat) > new Date();
	const isActiveReviewer = userId === ticketReviewer?.UserID;

	const formattedTime = useGetCountdown({ tatTime: tat });
	const showTimer = (((isActiveReviewer && isTicketExpired) || (userId === performedByID))
	&& !CLOSED_TICKET_STATUS.includes(status));

	if (detailsLoading) {
		return <TicketLoader count={1} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{t('myTickets:ticket_summary')}</div>
				<div className={cl`${styles.priority} ${styles[PRIORITY_MAPPING[priority]]}`}>
					{startCase(`${priority} ${t('myTickets:priority')}`)}
				</div>
			</div>
			<div className={styles.ticket_body}>
				<div className={styles.ticket_header}>
					<div className={styles.ticket_timer}>
						<div className={styles.ticket_id}>
							#
							{id}
						</div>
						{showTimer ? (
							<Tooltip content={t('myTickets:ticket_escalation_time')} placement="right">
								<div className={styles.timer}>
									<IcCWaitForTimeSlots />
									{formattedTime}
								</div>
							</Tooltip>
						) : (
							<div className={styles.escalation_label}>
								{hideTatTimer({ status, message: t('myTickets:already_escalated') })}
							</div>
						)}
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
					{t('myTickets:source')}
					:
					<span className={styles.updated_at}>{startCase(source)}</span>
				</div>
				<div className={styles.ticket_data}>
					{status === 'closed' ? t('myTickets:resolved_on') : t('myTickets:created_on')}
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
						{t('myTickets:created_by')}
						:
						<span className={styles.updated_at}>
							{agentName}
						</span>
					</div>
				)}
				{name && !isSameName && (
					<div className={styles.ticket_data}>
						{t('myTickets:on_behalf_of')}
						:
						<span className={styles.updated_at}>
							{name}
						</span>
					</div>
				)}
				{shortName && (
					<div className={styles.ticket_data}>
						{t('myTickets:organization')}
						:
						<span className={styles.updated_at}>
							{shortName}
						</span>
					</div>
				)}
				{email ? (
					<div className={styles.ticket_data}>
						{t('myTickets:email')}
						:
						<span className={styles.updated_at}>
							{email}
						</span>
					</div>
				)
					: null}
				{mobileNumber ? (
					<div className={styles.ticket_data}>
						{t('myTickets:contact_no')}
						:
						<span className={styles.updated_at}>
							{mobileCountryCode}
							{' '}
							{mobileNumber}
						</span>
					</div>
				)
					: null}
				{requestType && (
					<div className={styles.ticket_data}>
						{t('myTickets:request_type')}
						:
						<span className={styles.updated_at}>
							{startCase(requestType)}
						</span>
					</div>
				)}
				<ConfigDetails
					t={t}
					category={category}
					subCategory={subCategory}
					raisedToDesk={raisedToDesk}
					raisedByDesk={raisedByDesk}
					isCategoryConfig={isCategoryConfig}
				/>
				{serialId ? (
					<ShipmentDetails
						idType={idType}
						serialId={serialId}
						handleRouteBooking={handleRouteBooking}
						service={service}
						partnerId={partnerId}
						t={t}
						shipmentsData={shipmentsData}
						handleRouteSupply={handleRouteSupply}
						listLoading={listLoading}
					/>
				) : null}
				{service && (
					<div className={styles.ticket_data}>
						{t('myTickets:service')}
						:
						<span className={styles.updated_at}>
							{startCase(service)}
						</span>
					</div>
				)}
				{tradeType && (
					<div className={styles.ticket_data}>
						{t('myTickets:trade_type')}
						:
						<span className={styles.updated_at}>
							{startCase(tradeType)}
						</span>
					</div>
				)}
				{ticketReviewerName &&	(
					<div className={styles.ticket_data}>
						{t('myTickets:assigned_to')}
						:
						<span className={styles.updated_at}>
							{ticketReviewerName}
						</span>
					</div>
				)}
				{!isEmpty(authorizers) ? (
					<div className={styles.ticket_data}>
						{t('myTickets:closure_authorizers')}
						:
						<span className={styles.updated_at}>
							{authorizers.map((item) => item).join(', ') || '-'}
						</span>
					</div>
				)
					: null}
			</div>
		</div>
	);
}

export default TicketSummary;
