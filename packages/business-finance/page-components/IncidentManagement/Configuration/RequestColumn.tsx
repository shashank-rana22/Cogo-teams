import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../commons/showOverflowingNumber';
import { TooltipInterface } from '../utils/interface';
import { toTitleCase } from '../utils/titleCase';

import AccessorComponent from './AccessorComponent';
import SortIcon from './SortIcon';
import styles from './styles.module.css';

export const requestColumn = ({
	setIsAscendingActive,
	setFilters,
	isAscendingActive,
	getIncidentData,
	t,
	detailsModal = {},
	setDetailsModal = () => {},
}) => [
	{
		Header   : t('incidentManagement:incident_id_header'),
		accessor : 'incident_id',
		id       : 'incident_id',
		Cell     : ({ row: { original } }) => {
			const { referenceId = {} } = original || {};
			return (
				<span className={styles.incident_id}>{referenceId || '-'}</span>
			);
		},
	},
	{
		Header   : t('incidentManagement:company_name_header'),
		accessor : 'company_name',
		id       : 'company_name',
		Cell     : ({ row: { original } }) => {
			const { data = {} } = original || {};
			const { organization = '' } = data || {};
			const { interCompanyJournalVoucherRequest } = data || {};
			const { list } = interCompanyJournalVoucherRequest || {};
			const getList = () => (list || [{}]).map(
				(item: TooltipInterface) => item?.tradePartyName,
			);
			const bankTradePartyName =				data?.bankRequest && data?.organization?.tradePartyType;
			const tdsTradePartyName =				data?.tdsRequest && data?.organization?.tradePartyType;
			const BusinessName = (
				<div>
					{toTitleCase(
						organization?.businessName || '-',
					)}
				</div>
			);

			return list ? (
				<Tooltip
					interactive
					content={(list || [{}]).map((item: TooltipInterface) => (
						<div className={styles.trade_party_name} key={item?.id}>
							<div>{toTitleCase(item?.div || '-')}</div>
						</div>
					))}
				>
					<div className={styles.wrapper}>
						{getList()[GLOBAL_CONSTANTS.zeroth_index]}
					</div>
				</Tooltip>
			) : (
				<div>
					<Tooltip
						interactive
						content={
							bankTradePartyName || tdsTradePartyName ? (
								<div>
									{(organization?.tradePartyType === 'SELF'
										? organization?.businessName
										: organization?.tradePartyName)
										|| toTitleCase(
											organization?.businessName || '-',
										)}
								</div>
							)
								: BusinessName
}
					>
						{bankTradePartyName || tdsTradePartyName ? (
							<div className={styles.wrapper}>
								{(organization?.tradePartyType === 'SELF'
									? organization?.businessName
									: organization?.tradePartyName)
									|| toTitleCase(
										organization?.businessName || '-',
									)}
							</div>
						) : (
							<div className={styles.wrapper}>
								{toTitleCase(organization?.businessName || '-')}
							</div>
						)}
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : t('incidentManagement:requested_by_header'),
		accessor : 'requested_by',
		id       : 'requested_by',
		Cell     : ({ row: { original } }) => {
			const { createdBy = {} } = original || {};
			const { name = '' } = createdBy || {};
			return <span>{showOverflowingNumber(name || '-', 10)}</span>;
		},
	},
	{
		Header   : t('incidentManagement:request_type_header'),
		accessor : 'type',
		id       : 'request_type',
		Cell     : ({ row: { original } }) => {
			const { type: requestType = '', data } = original || {};

			const { creditNoteRequest } = data || {};

			const { revoked } = creditNoteRequest || {};
			return (
				<div className={styles.credit}>
					<span>
						{requestType
						=== 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? (
							<span>
								{t('incidentManagement:icjv_approval')}
							</span>
							) : (
								toTitleCase(startCase(requestType || '-'))
							)}
					</span>
					<span>
						{typeof revoked === 'boolean' && (
							<div>
								{revoked ? (
									<Pill size="md" color="#C4DC91">
										{t('incidentManagement:fully_revoked')}
									</Pill>
								) : (
									<Pill size="md" color="#FEF199">
										{t('incidentManagement:partial_revoked')}
									</Pill>
								)}
							</div>
						)}
					</span>
				</div>
			);
		},
	},
	{
		Header   : t('incidentManagement:request_sub_type_header'),
		accessor : 'incidentSubtype',
		id       : 'request_sub_type',
		Cell     : ({ row: { original } }) => {
			const { incidentSubtype = '' } = original || {};
			return (
				<Tooltip
					interactive
					content={(incidentSubtype.replace(/_/g, ' '))}
				>
					<div className={styles.wrapper}>{(incidentSubtype.replace(/_/g, ' '))}</div>
				</Tooltip>
			);
		},
	},
	{
		Header   : t('incidentManagement:source_header'),
		accessor : 'source',
		id       : 'source',
		Cell     : ({ row: { original } }) => {
			const { source = '' } = original || {};
			return <span>{startCase(source || '-')}</span>;
		},
	},
	{
		Header: () => (
			<div className={styles.flex}>
				{t('incidentManagement:request_date')}
				<SortIcon
					setIsAscendingActive={setIsAscendingActive}
					setFilters={setFilters}
					isAscendingActive={isAscendingActive}
				/>
			</div>
		),
		accessor: (row) => {
			const { createdAt } = row;
			return (
				<div>
					{formatDate({
						date: createdAt,
						dateFormat:
							GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})}
					<div>
						{formatDate({
							date: createdAt,
							timeFormat:
								GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType: 'time',
						})}
					</div>
				</div>
			);
		},
		id: 'request_date',
	},
	{
		Header   : t('incidentManagement:status_header'),
		accessor : ({ currentLevel = 0 }) => (
			<span className={styles.status_level}>
				{t('incidentManagement:levels_label')}
				{' '}
				{currentLevel}
				{t('incidentManagement:_pending_status')}
			</span>
		),
		id: 'status',
	},
	{
		accessor: (row) => (
			<AccessorComponent
				row={row}
				getIncidentData={getIncidentData}
				detailsModal={detailsModal}
				setDetailsModal={setDetailsModal}
			/>
		),
		id: 'action',
	},

	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row: any) => {
			const { deadlineTag } = row;
			return (
				deadlineTag && (
					<div>
						{deadlineTag === 'RED' && (
							<div
								className={
									deadlineTag === 'RED' && styles.ribbon_red
								}
							>
								{t('incidentManagement:urgent')}
							</div>
						)}
						{deadlineTag === 'ORANGE' && (
							<div
								className={
									deadlineTag === 'ORANGE'
									&& styles.ribbon_orange
								}
							>
								{t('incidentManagement:urgent')}
							</div>
						)}
					</div>
				)
			);
		},
	},
];
