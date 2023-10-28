// import { IcMInfo } from '@cogoport/icons-react';
import { ButtonIcon, Tooltip } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const statusmap = {
	level1_approved : { label: 'L1 Approved', color: '#849E4C', background: '#F7FAEF' },
	level2_approved : { label: 'L2 Approved', color: '#849E4C', background: '#F7FAEF' },
	processed       : { label: 'Processed', color: '#849E4C', background: '#F7FAEF' },
	rejected        : { label: 'Rejected', color: '#C26D1A', background: '#FEF3E9' },
	pending         : { label: 'Pending', color: '#C26D1A', background: '#FEF3E9' },
};

function GetStatus(name) {
	if (name === null) return '-';
	const ele = statusmap[name];
	return (
		<div style={{ background: ele?.background }} className={styles.custompill}>
			<span style={{ color: ele?.color }}>{ele?.label}</span>
		</div>
	);
}

const getColumns = ({ setItem, setShow, handleUpdate }) => {
	const columns = [
		{
			Header   : <div className={styles.header}>CATEGORY</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item?.category || '-'}
				</div>
			),
			id: 'category',
		},
		{
			Header   : <div className={styles.header}>DESCRIPTION</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item?.description || '-'}
				</div>
			),
			id: 'description',
		},
		{
			Header   : <div className={styles.header}>L1 Remarks</div>,
			accessor : (item) => (

				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={<div className={styles.tooltip_data}>{`${item.level1_remarks}`}</div>}
				>
					<div
						className={styles.data}
					>
						{item?.level1_remarks || '-'}
					</div>
				</Tooltip>
			),
			id: 'level1_remarks',
		},
		{
			Header   : <div className={styles.header}>L2 Remarks</div>,
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={<div className={styles.tooltip_data}>{`${item.level2_remarks}`}</div>}
				>
					<div
						className={styles.data}
					>
						{item?.level2_remarks || '-'}
					</div>
				</Tooltip>
			),
			id: 'level2_remarks',
		},
		{
			Header   : <div className={styles.header}>Amount</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item?.amount || '-'}
					{/* {item.salary_date ? formatDate({
						date       : item.salary_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'} */}
				</div>
			),
			id: 'amount',
		},
		{
			Header   : <div className={styles.header}>Activity</div>,
			accessor : (item) => (
				<div
					className={styles.data}
					aria-hidden
					onClick={async () => {
						setItem(item);
						setShow(true);
					}}
				>
					<ButtonIcon
						size="md"
						icon={(
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/this_is_stopwatch.svg"
								alt="stopwatch"
							/>
						)}
						themeType="primary"
					/>
				</div>
			),
			id: 'activity',
		},
		{
			Header   : <div className={styles.header}>Status</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{GetStatus(item?.reimbursement_status)}
				</div>
			),
			id: 'status',
		},
		// {
		// 	Header   : <div className={styles.header}>AMOUNT</div>,
		// 	accessor : (item) => (
		// 		<div className={styles.data}>
		// 			{item.amount}
		// 		</div>
		// 	),
		// 	id: 'amount',
		// },
		{
			Header   : <div className={styles.header}>Actions</div>,
			accessor : (item) => (
				item?.reimbursement_status === 'pending'
					? (
						<div
							className={styles.data}
							aria-hidden
							onClick={() => handleUpdate(item?.id, 'delete')}
						>
							<ButtonIcon size="md" icon={<IcMDelete />} themeType="primary" />
							{/* <ButtonIcon size="md" icon={<IcMEdit />} themeType="primary" /> */}
						</div>
					)
					: null
			),
			id: 'attachments',
		},
	];
	return [...columns];
};
export default getColumns;
