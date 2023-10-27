// import { IcMInfo } from '@cogoport/icons-react';
import { ButtonIcon, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const statusmap = {
	level1_approved : { label: 'L1 Approved', color: '#BF291E', background: '#FDEBE9' },
	level2_approved : { label: 'L2 Approved', color: '#BF291E', background: '#FDEBE9' },
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

const getColumnsManager = ({ setItem, setShow, handleUpdate }) => {
	const columns = [
		{
			Header   : <div className={styles.header}>Name</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{item?.name || '-'}
				</div>
			),
			id: 'name',
		},
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
				<div
					className={styles.data}
				>
					<Button
						size="md"
						themeType="secondary"
						style={{ color: '#849E4C', background: '#F7FAEF', marginRight: '8px' }}
						onClick={() => handleUpdate(item?.id, 'rejected')}
					>
						Reject

					</Button>
					<Button
						size="md"
						style={{ color: '#C26D1A', background: '#FEF3E9' }}
						themeType="secondary"
						onClick={() => handleUpdate(item?.id, 'approved')}
					>
						Approve

					</Button>
				</div>
			),
			id: 'attachments',
		},
	];
	return [...columns];
};
export default getColumnsManager;
