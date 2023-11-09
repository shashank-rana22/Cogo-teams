import { ButtonIcon } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDelete } from '@cogoport/icons-react';
import { getMonth, getDate } from '@cogoport/utils';
import React from 'react';

import { MONTHS } from '../../../Constants/contants';

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

const getColumns = ({ setItem = () => {}, setShow = () => {}, handleUpdate = () => {} }) => {
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
			Header   : <div className={styles.header}>Submitted On</div>,
			accessor : (item) => (

				<div
					className={styles.data}
				>
					{
								`${MONTHS[getMonth(new Date(item?.submitted_on))].label}
								${getDate(new Date(item?.submitted_on))}` || '-'
}
				</div>
			),
			id: 'submitted_on',
		},
		{
			Header   : <div className={styles.header}>Amount</div>,
			accessor : (item) => (
				<div
					className={styles.data}
				>
					{formatAmount({
						amount  : item?.amount,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
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
