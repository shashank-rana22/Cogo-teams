import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const useGetColumns = () => (
	[
		{
			Header   : 'EFFECTIVE FROM',
			accessor : (item) => (
				<div className={styles.table_item}>
					{(item?.effective_from) ? formatDate({
						date       : item.effective_from,
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
					{(item?.effective_to) ? formatDate({
						date       : item.effective_to,
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
					{(item?.confirmation_due_date) ? formatDate({
						date       : item.confirmation_due_date,
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
					{(item?.confirmation_date) ? formatDate({
						date       : item.confirmation_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : ' — '}
				</div>
			),
			id: 'confirmationDate',
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (
				<div className={styles.table_item}>
					<span className={styles.status}>{item?.employee_status || ' — '}</span>
				</div>
			),
			id: 'status',
		},
	]
);

export default useGetColumns;
