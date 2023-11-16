import { Tooltip, Button, Avatar, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function GetInsightsData(item) {
	if (item?.total_payout_insights > 0) {
		return (
			<div className={cl`${styles.positive}`}>
				{item?.total_payout_insights}
				{' '}
				% more than last month
			</div>
		);
	}
	if (item?.total_payout_insights < 0) {
		return (
			<div className={cl`${styles.negative}`}>
				{item?.total_payout_insights}
				{' '}
				% less than last month
			</div>
		);
	}

	return (
		<div>
			same as last month
		</div>
	);
}

const getColumnsEarning = ({ handleOpenModal }) => {
	const columns = [
		{
			Header   : 'Name',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							<div>
								{`${item.name}(${item.employee_code})` || '-'}

								<div className={styles.fte_details}>
									<span className={styles.fte_detail}>{item.employee_type}</span>
								</div>
							</div>
						</div>
					)}
				>
					<div className={styles.data_name}>
						<div className={styles.avatar}>
							<Avatar personName={item.name} />
						</div>
						<div>
							{`${item.name}(${item.employee_code})` || '-'}

							<div className={styles.fte_details}>
								<span className={styles.fte_detail}>{item.employee_type}</span>
							</div>
						</div>
					</div>

				</Tooltip>
			),
			id: 'name',
		},
		{
			Header   : 'PAYABLE DAYS',
			accessor : (item) => (
				<div
					className={styles.data}

				>
					{item.payable_days || '-'}
					{' '}
					<IcMInfo className={styles.info_icon} />
				</div>
			),
			id: 'payable_days',
		},
		{
			Header   : 'DESIGNATION',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{item.role || '-'}
						</div>
					)}
				>
					<div
						className={styles.data}
					>
						{item.role || '-'}
						{' '}
						<IcMInfo className={styles.info_icon} />
					</div>
				</Tooltip>
			),
			id: 'designation',
		},
		{
			Header   : 'ADDITIONS',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{item.bonuses + item.incentives + item.reimbursement + item.arrears + item.gifts || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.bonuses + item.incentives + item.reimbursement + item.arrears + item.gifts || '-'}
						<IcMInfo className={styles.info_icon} />
					</div>
				</Tooltip>
			),
			id: 'additions',
		},
		{
			Header   : 'DEDUCTIONS',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{item.deductions || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{item.deductions || '-'}
						<IcMInfo className={styles.info_icon} />
					</div>
				</Tooltip>
			),
			id: 'deductions',
		},
		{
			Header   : 'TOTAL PAYOUT',
			accessor : (item) => (
				<div>
					{GetInsightsData(item)}
				</div>
			),
			id: 'total_payout_insights',
		},
		{
			Header   : 'ACTION',
			accessor : (item) => (
				<Button
					size="md"
					themeType="secondary"
					className={styles.services_btn}
					onClick={(event) => {
						event.stopPropagation();
						handleOpenModal(item.employee_id, item.id);
					}}
				>
					<span style={{ marginLeft: '8px' }}>View</span>
				</Button>
			),
			id: 'action',
		},

	];

	return [...columns];
};

export default getColumnsEarning;
