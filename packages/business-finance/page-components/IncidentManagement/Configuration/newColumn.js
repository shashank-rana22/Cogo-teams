import { Tooltip, Pill, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { toTitleCase } from '../utils/titleCase.ts';

import SortIcon from './SortIcon/index.tsx';
import styles from './styles.module.css';

const SIXTH_SPLICE_INDEX = 6;
const FIRST_SPLICE_INDEX = 1;

function getColumns({
	setIsAscendingActive = () => {}, setFilters = () => {},
	isAscendingActive = '', t,
	setDetailsModal = () => { },
	activeTab = 'requested',
}) {
	const MAPPING = {
		requested : 'Request Remarks',
		approved  : 'Approval Remarks',
		rejected  : 'Rejection Remarks',
	};

	const column = 		[
		{
			Header   : t('incidentManagement:incident_id_header'),
			accessor : 'incident_id',
			id       : 'incident_id',
			Cell     : ({ row: { original } }) => {
				const { referenceId = {} } = original || {};
				return <span className={styles.incident_id}>{referenceId}</span>;
			},
			width: '10%',
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
							{requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? (
								<span>
									{t('incidentManagement:icjv_approval')}
								</span>
							)
								: toTitleCase(requestType ? startCase(requestType) : '-')}

						</span>
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
			width: '10%',
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
						content={(incidentSubtype?.replace(/_/g, ' '))}
					>
						<div className={styles.wrapper}>{(incidentSubtype?.replace(/_/g, ' '))}</div>
					</Tooltip>
				);
			},
			width: '10%',
		},
		{
			Header   : t('incidentManagement:source_header'),
			accessor : 'source',
			id       : 'source',
			Cell     : ({ row: { original } }) => {
				const { source = '' } = original || {};
				return <span>{startCase(source || '-')}</span>;
			},
			width: '10%',
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
					<div>
						{createdAt ? formatDate({
							date: createdAt,
							dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : '_'}
					</div>
				);
			},
			id    : 'request_date',
			width : '10%',
		},
		{
			Header   : <div className={styles.request_header}>{MAPPING[activeTab]}</div>,
			accessor : 'financeRemark',
			id       : 'remark',
			Cell     : ({ row: { original } }) => {
				const { financeRemark = '', remark = '' } = original || {};

				return (
					<div className={styles.remark}>{financeRemark || remark}</div>
				);
			},
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
			id    : 'status',
			width : '10%',
		},

		{
			accessor: (row) => (
				<Button size="md" themeType="secondary" onClick={() => setDetailsModal(row)}>View2</Button>

			),
			id    : 'actionColumn',
			width : '10%',
		},
	];
	if (activeTab === 'requested') { return column; }
	column.splice(SIXTH_SPLICE_INDEX, FIRST_SPLICE_INDEX);
	return column;
}

export default getColumns;
