import { Pill, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import ShowOverflowingNumber from '../../commons/utils/showOverflowingNumber';
import RenderRemarks from '../common/RenderRemarks';
import { toTitleCase } from '../utils/titleCase';

import SortIcon from './SortIcon/index';
import styles from './styles.module.css';

const SIXTH_SPLICE_INDEX = 8;
const FIRST_SPLICE_INDEX = 1;
const OVERFLOW_NUMBER = 40;

function getColumns({
	setIsAscendingActive = () => { }, setFilters = () => { },
	isAscendingActive = '', t,
	setDetailsModal = () => { },
	activeTab = 'requested',
}) {
	const column = [
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
				const { organization = '', concorPdaApprovalRequest = {} } = data || {};
				const { interCompanyJournalVoucherRequest } = data || {};
				const { list } = interCompanyJournalVoucherRequest || {};
				const getList = () => (list || [{}]).map((item) => item?.tradePartyName);
				const companyName = getList()?.[GLOBAL_CONSTANTS.zeroth_index];
				const bankTradePartyName = data?.bankRequest && data?.organization?.tradePartyType;
				const tdsTradePartyName = data?.tdsRequest && data?.organization?.tradePartyType;
				return list ? (
					<div className={cl`${styles.company_name} ${styles.common}`}>
						<ShowOverflowingNumber
							value={toTitleCase(companyName)}
							maxLength={OVERFLOW_NUMBER}
						/>
					</div>
				) : (
					<div>
						{bankTradePartyName || tdsTradePartyName ? (
							<div className={cl`${styles.company_name} ${styles.common}`}>
								<ShowOverflowingNumber
									value={toTitleCase((organization?.tradePartyType === 'SELF'
										? organization?.businessName : organization?.tradePartyName))}
									maxLength={OVERFLOW_NUMBER}
								/>
							</div>
						) : (
							<div className={cl`${styles.company_name} ${styles.common}`}>
								<ShowOverflowingNumber
									value={toTitleCase(organization?.businessName
										|| concorPdaApprovalRequest?.supplierName)}
									maxLength={OVERFLOW_NUMBER}
								/>
							</div>
						)}

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
					<div className={cl`${styles.requested_by} ${styles.common}`}>
						<ShowOverflowingNumber value={toTitleCase(name)} maxLength={OVERFLOW_NUMBER} />
					</div>
				);
			},
		},
		{
			Header   : t('incidentManagement:request_type_header'),
			accessor : 'type',
			id       : 'request_type',
			Cell     : ({ row: { original } }) => {
				const { type: requestType = '', data } = original || {};
				const { creditNoteRequest, jobOpenRequest } = data || {};
				const { jobNumber } = jobOpenRequest || {};
				const { revoked } = creditNoteRequest || {};
				return (
					<div className={styles.credit}>
						<div className={cl`${styles.type_request} ${styles.common}`}>
							{requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? (
								<span>
									{t('incidentManagement:icjv_approval')}
								</span>
							)
								: (
									<ShowOverflowingNumber
										value={toTitleCase(startCase(requestType))}
										maxLength={OVERFLOW_NUMBER}
									/>
								)}
						</div>
						<span>
							{typeof (revoked) === 'boolean' && (
								<div>
									{revoked ? (
										<Pill size="md" color="#f8aea8">
											{t('incidentManagement:fully_revoked')}
										</Pill>
									) : (
										<Pill size="md" color="#FEF199">
											{t('incidentManagement:partial_revoked')}
										</Pill>
									)}
								</div>
							)}
							{requestType === 'JOB_OPEN' ? (
								<div className={styles.job_open}>
									SID-
									{jobNumber || ''}
								</div>
							) : null}
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
					<div className={cl`${styles.sub_type} ${styles.common}`}>
						<ShowOverflowingNumber
							value={toTitleCase(incidentSubtype?.replace(/_/g, ' '))}
							maxLength={OVERFLOW_NUMBER}
						/>
					</div>
				);
			},
		},
		{
			Header   : t('incidentManagement:source_header'),
			accessor : 'source',
			id       : 'source',
			Cell     : ({ row: { original } }) => {
				const { source = '' } = original || {};
				return <div className={cl`${styles.source} ${styles.common}`}>{startCase(source || '-')}</div>;
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
				const { createdAt = '' } = row || {};
				const [date, time] = createdAt?.split(' ') || [];
				const [day, month, year] = date.split('-');
				const reversedDate = `${year}-${month}-${day} ${time}`;

				return (
					<>
						<div className={styles.time}>
							{date ? formatDate({
								date: reversedDate,
								dateFormat:
									GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							}) : '_'}
						</div>
						<div>
							{time ? formatDate({
								date       : reversedDate,
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
			Header   : <div>Remark</div>,
			accessor : 'financeRemark',
			id       : 'remark',
			Cell     : ({ row: { original } }) => (
				<RenderRemarks remarksDetails={original} />
			),
		},
		{
			Header   : activeTab === 'requested' && t('incidentManagement:status_header'),
			accessor : ({ currentLevel = 0 }) => (
				<span className={styles.status_level}>
					{t('incidentManagement:levels_label')}
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
		{
			Header   : '',
			id       : 'ribbon',
			accessor : (row) => {
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
	if (activeTab === 'requested') { return column; }
	column.splice(SIXTH_SPLICE_INDEX, FIRST_SPLICE_INDEX);
	return column;
}

export default getColumns;
