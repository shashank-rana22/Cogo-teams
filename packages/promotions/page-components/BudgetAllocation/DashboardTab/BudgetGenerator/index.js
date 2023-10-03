import { ButtonIcon, Select, Input } from '@cogoport/components';
import currencyCode from '@cogoport/globalization/constants/currencyCode';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit, IcMTick, IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateBudgetAmount from '../../../../hooks/useUpdateBudgetAmount';

import styles from './styles.module.css';

const options = [
	{ label: currencyCode.USD, value: currencyCode.USD },
	{ label: currencyCode.INR, value: currencyCode.INR },
];

function BudgetGenerator({
	budgetId = '',
	amount = '',
	budgetValue = '',
	setBudgetValue = () => {},
	refetchDashboard = () => {},
	params = {},
	setParams = () => {},
}) {
	const [isEdit, setIsEdit] = useState(false);
	const { loading = {}, updateBudgetAmount = () => {} } = useUpdateBudgetAmount();

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.title}>Budget:</div>
				{isEdit ? (
					<div className={styles.content}>
						<Input
							className={styles.main_text}
							size="md"
							placeholder="Enter Budget amount"
							value={budgetValue}
							onChange={setBudgetValue}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMTick />}
							themeType="primary"
							disabled={loading}
							onClick={() => {
								updateBudgetAmount({
									data: {
										id     : budgetId,
										amount : parseFloat(budgetValue),
									},
									refetchDashboard,
								});
								setIsEdit(false);
							}}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMCross />}
							disabled={loading}
							themeType="primary"
							onClick={() => {
								setIsEdit(false);
							}}
						/>
					</div>
				) : (
					<div className={styles.content}>
						<div className={styles.main_text}>
							{formatAmount({
								amount,
								currency : params.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 0,
								},
							})}
						</div>
						<ButtonIcon
							size="md"
							icon={<IcMEdit />}
							themeType="primary"
							onClick={() => {
								setIsEdit(true);
							}}
						/>
					</div>
				)}
			</div>
			<div className={styles.content}>
				<div className={styles.currency_text}>Currency:</div>
				<div className={styles.currency_select}>
					<Select
						value={params.currency}
						onChange={(e) => { setParams({ ...params, currency: e }); }}
						placeholder="Select Currency"
						size="md"
						options={options}
					/>
				</div>
			</div>
		</div>
	);
}

export default BudgetGenerator;
