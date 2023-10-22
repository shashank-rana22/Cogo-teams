import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ handleOpenModal, handleDeleteModal }) => [
	{
		Header   : 'LEAVE TYPE',
		accessor : (item) => (
			<div className={styles.table_data_item}>
				{startCase(item?.leave_type) || '-'}
			</div>
		),
		id: 'leave_type',
	},
	{
		Header   : 'FROM DATE',
		accessor : (item) => (
			<div className={styles.table_data_item}>
				{formatDate({
					date       : item?.leave_start_date || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
		id: 'from_date',
	},
	{
		Header   : 'TO DATE',
		accessor : (item) => (
			<div className={styles.table_data_item}>
				{formatDate({
					date       : item?.leave_end_date || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
		id: 'to_date',
	},
	{
		Header   : 'TOTAL DAYS',
		accessor : (item) => (
			<div className={styles.table_data_item}>
				{item?.leave_count || '-'}
			</div>
		),
		id: 'total_days',
	},
	{
		Header   : 'REMARKS',
		accessor : (item) => (
			<Tooltip content={item?.leave_reason} placement="top">
				<div className={styles.remarks}>
					{startCase(item?.leave_reason) || '-'}
				</div>
			</Tooltip>
		),
		id: 'remarks',
	},
	{
		Header   : 'APPROVER',
		accessor : (item) => (
			<div className={styles.table_data_item}>
				{startCase(item?.approver_name) || '-'}
			</div>
		),
		id: 'approver',
	},
	{
		Header   : 'STATUS',
		accessor : (item) => {
			const getStatusClass = (status) => {
				if (status === 'approved') {
					return {
						colorClass   : styles.approved_color,
						bgColorClass : styles.approved_color_bg,
					};
				}
				if (status === 'rejected') {
					return {
						colorClass   : styles.rejected_color,
						bgColorClass : styles.rejected_color_bg,
					};
				}
				return {
					colorClass   : styles.pending_color,
					bgColorClass : styles.pending_color_bg,
				};
			};

			const { colorClass, bgColorClass } = getStatusClass(item.leave_status);

			return (
				<div className={cl`
					${styles.pending_flex}
					${colorClass}`}
				>
					<div className={cl`
					${styles.pending_dot}
					${bgColorClass}`}
					/>
					{startCase(item?.leave_status) || '-'}
				</div>
			);
		},
		id: 'status',
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div className={styles.action}>
				{item.leave_status === 'pending' ? (
					<IcMEdit
						className={cl`${styles.mr_16} ${styles.cursor}`}
						onClick={() => handleOpenModal(item)}
					/>
				) : <div style={{ marginRight: 26 }} />}
				{(item.leave_status === 'approved' || item.leave_status === 'rejected') ? '-'
					: <IcMDelete className={styles.cursor} onClick={() => handleDeleteModal(item)} />}
			</div>
		),
		id: 'action',
	},

];

export default getColumns;
