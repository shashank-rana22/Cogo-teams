import { Pill, Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import ShowOverflowingNumber from '../../commons/utils/showOverflowingNumber';
import { MAPPING } from '../Constants/tab_mapping';
import { toTitleCase } from '../utils/titleCase.ts';

import SortIcon from './SortIcon/index.tsx';
import styles from './styles.module.css';

const SIXTH_SPLICE_INDEX = 8;
const FIRST_SPLICE_INDEX = 1;
const OVERFLOW_NUMBER = 10;

function getColumns({
	setIsAscendingActive = () => {}, setFilters = () => {},
	isAscendingActive = '', t,
	setDetailsModal = () => { },
	activeTab = 'requested',
}) {
	const column = 		[
		{
			Header   : t('incidentManagement:incident_id_header'),
			accessor : 'incident_id',
			id       : 'incident_id',
			Cell     : ({ row: { original } }) => {
				const { referenceId = {} } = original || {};
				return <span className={styles.incident_id}>{referenceId}</span>;
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
					(item) => item?.tradePartyName,
				);
				const bankTradePartyName = data?.bankRequest && data?.organization?.tradePartyType;
				const tdsTradePartyName = data?.tdsRequest && data?.organization?.tradePartyType;
				function BusinessName() {
					return (
						<div>
							{toTitleCase(
								organization?.businessName || '-',
							)}
						</div>
					);
				}

				return list ? (
					<Tooltip
						interactive
						content={(list || [{}]).map((item) => (
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
										: <BusinessName />
								}
						>
							{bankTradePartyName || tdsTradePartyName ? (
								<div className={styles.company_name}>
									{(organization?.tradePartyType === 'SELF'
										? organization?.businessName
										: organization?.tradePartyName)
											|| toTitleCase(
												organization?.businessName || '-',
											)}
								</div>
							) : (
								<div className={styles.company_name}>
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
				return (
					<ShowOverflowingNumber value={name} maxLength={OVERFLOW_NUMBER} />
				);
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
						<div className={styles.type_request}>
							{requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? (
								<span>
									{t('incidentManagement:icjv_approval')}
								</span>
							)
								: toTitleCase(requestType ? startCase(requestType) : '-')}
						</div>
						<span>
							{typeof (revoked) === 'boolean' && (
								<div>
									{revoked
										? (
											<Pill size="md" color="#C4DC91">
												{t('incidentManagement:fully_revoked')}
											</Pill>
										)
										: (
											<Pill size="md" color="#FEF199">
												{ t('incidentManagement:partial_revoked')}
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
					<div className={styles.request}>{(incidentSubtype?.replace(/_/g, ' '))}</div>
				);
			},
		},
		{
			Header   : t('incidentManagement:source_header'),
			accessor : 'source',
			id       : 'source',
			Cell     : ({ row: { original } }) => {
				const { source = '' } = original || {};
				return <div className={styles.time}>{startCase(source || '-')}</div>;
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
				const { createdAt } = row || {};
				return (
					<>
						<div className={styles.time}>
							{createdAt ? formatDate({
								date: createdAt,
								dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							}) : '_'}
						</div>
						<div>
							{createdAt ? formatDate({
								date       : createdAt,
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'time',
							}) : '_'}
						</div>
					</>
				);
			},
			id: 'request_date',
		},
		{
			Header   : <div>{MAPPING[activeTab]}</div>,
			accessor : 'financeRemark',
			id       : 'remark',
			Cell     : ({ row: { original } }) => {
				const { financeRemark = '', remark = '', type = '', data = {} } = original || {};
				return (
					<Tooltip
						interactive
						content={type === 'JOB_OPEN'
							? financeRemark || data?.jobOpenRequest?.remark || remark
							: financeRemark || remark}
					>
						<div className={styles.remark}>
							{type === 'JOB_OPEN'
								? financeRemark || data?.jobOpenRequest?.remark || remark
								: financeRemark || remark }
						</div>
					</Tooltip>
				);
			},
		},
		{
			Header   : activeTab === 'requested' && t('incidentManagement:status_header'),
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
				<Button size="md" themeType="secondary" onClick={() => setDetailsModal(row)}>View</Button>

			),
			id: 'actionColumn',
		},
	];
	if (activeTab === 'requested') { return column; }
	column.splice(SIXTH_SPLICE_INDEX, FIRST_SPLICE_INDEX);
	return column;
}

export default getColumns;
