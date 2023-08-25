import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = () => [
	{
		Header   : 'LEAVE TYPE',
		accessor : (item) => (
			<div>
				{startCase(item?.leave_type) || '-'}
			</div>
		),
		id: 'leave_type',
	},
	{
		Header   : 'FROM DATE',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.leave_start_date || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
					separator  : ' | ',
				})}
			</div>
		),
		id: 'from_date',
	},
	{
		Header   : 'TO DATE',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.leave_end_date || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
					separator  : ' | ',
				})}
			</div>
		),
		id: 'to_date',
	},
	{
		Header   : 'TOTAL DAYS',
		accessor : (item) => (
			<div>
				{startCase(item?.leave_count) || '-'}
			</div>
		),
		id: 'total_days',
	},
	{
		Header   : 'REMARKS',
		accessor : (item) => (
			<div className={styles.remarks}>
				{startCase(item?.approval_remarks) || '-'}
			</div>
		),
		id: 'remarks',
	},
	{
		Header   : 'APPROVER',
		accessor : (item) => (
			<div>
				{startCase(item?.approved_by_id) || '-'}
			</div>
		),
		id: 'approver',
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div className={styles.pending}>
				{startCase(item?.leave_status) || '-'}
			</div>
		),
		id: 'status',
	},
	{
		Header   : 'ACTION',
		accessor : () => (
			<div className={styles.action}>
				<IcMEdit />
				<IcMDelete />
			</div>
		),
		id: 'action',
	},

];

export default getColumns;
