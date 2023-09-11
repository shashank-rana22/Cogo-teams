import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';

import styles from './styles.module.css';

function EmploymentStatus({ data: { job_history } = {} }) {
	const columns = [
		{
			Header   : 'EFFECTIVE FROM',
			accessor : (item) => (
				<div className={styles.table_item}>
					{(item?.effectiveFrom) ? formatDate({
						date       : item.effectiveFrom,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : ' — '}
				</div>
			),
			id: 'effectiveFrom',
		},
		{
			Header   : 'EFFECTIVE TO',
			accessor : (item) => (
				<div className={styles.table_item}>
					{(item?.effectiveTo) ? formatDate({
						date       : item.effectiveTo,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : ' — '}
				</div>
			),
			id: 'effectiveTo',
		},
		{
			Header   : 'CONFIRMATION DUE DATE',
			accessor : (item) => (
				<div className={styles.table_item}>
					{(item?.confirmationDueDate) ? formatDate({
						date       : item.confirmationDueDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : ' — ' }
				</div>
			),
			id: 'confirmationDueDate',
		},
		{
			Header   : 'CONFIRMATION DATE',
			accessor : (item) => (
				<div className={styles.table_item}>
					{(item?.confirmationDate) ? formatDate({
						date       : item.confirmationDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : ' — '}
				</div>
			),
			id: 'confirmationDate',
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (<div className={styles.table_item}>{item?.status || ' — '}</div>),
			id       : 'status',
		},
		{
			Header   : 'ACTION',
			accessor : (item) => (
				<div className={styles.table_item}>
					<Button size="md" themeType="accent">{item.action}</Button>
				</div>
			),
			id: 'action',
		},
	];

	const data = job_history.map((job) => ({
		effectiveFrom       : job.effective_from,
		effectiveTo         : job.effective_to,
		confirmationDueDate : job.confirmation_due_date,
		confirmationDate    : job.confirmation_date,
		status              : job.employee_status,
		action              : 'View',
	}));

	return (
		<div className={styles.info_container}>
			<span className={styles.info_heading}>EMPLOYMENT STATUS</span>
			<StyledTable columns={columns} data={data} className="margin_top" />
		</div>
	);
}

export default EmploymentStatus;
