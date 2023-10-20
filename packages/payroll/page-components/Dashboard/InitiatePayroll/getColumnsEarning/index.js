import { Tooltip, Button, Avatar } from '@cogoport/components';
import { IcMEdit, IcMDummyCircle, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

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
									<IcMDummyCircle className={styles.fte_detail} />
									<span className={styles.fte_detail}>
										{item.base_ctc}
										/year
									</span>
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
								<IcMDummyCircle className={styles.fte_detail} />
								<span className={styles.fte_detail}>
									{item.base_ctc}
									/year
								</span>
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
		// {
		// 	Header   : 'REIMBURSEMENTS',
		// 	accessor : (item) => (
		// 		<Tooltip
		// 			interactive
		// 			placement="top"
		// 			className={styles.tooltip}
		// 			content={(
		// 				<div className={styles.tooltip_data}>
		// 					{item.reimbursement	 || '-'}
		// 				</div>
		// 			)}
		// 		>
		// 			<div className={styles.data}>
		// 				{item.reimbursement || '-'}
		// 				<IcMInfo className={styles.info_icon} />
		// 			</div>
		// 		</Tooltip>
		// 	),
		// 	id: 'reimbursements',
		// },
		// {
		// 	Header   : 'APPEARS',
		// 	accessor : (item) => (
		// 		<Tooltip
		// 			interactive
		// 			placement="top"
		// 			className={styles.tooltip}
		// 			content={(
		// 				<div className={styles.tooltip_data}>
		// 					{item.arrears || '-'}
		// 				</div>
		// 			)}
		// 		>
		// 			<div className={styles.data}>
		// 				{item.arrears || '-'}
		// 				<IcMInfo className={styles.info_icon} />
		// 			</div>
		// 		</Tooltip>
		// 	),
		// 	id: 'appears',
		// },
		{
			Header   : 'TOTAL PAYOUT',
			accessor : (item) => (
				<Tooltip
					interactive
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_data}>
							{item.net_salary || '-'}
						</div>
					)}
				>
					<div className={styles.data}>
						{Math.round(item.net_salary) || '-'}
						<IcMInfo className={styles.info_icon} />
					</div>
				</Tooltip>
			),
			id: 'total_payout',
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
					<IcMEdit />
					<span style={{ marginLeft: '8px' }}>Edit</span>
				</Button>
			),
			id: 'action',
		},

	];

	return [...columns];
};

export default getColumnsEarning;
