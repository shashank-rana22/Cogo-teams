import { ButtonIcon, Select, Input } from '@cogoport/components';
import { IcMEdit, IcMTick, IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdatePromotionBudgetAmount from '../../../../hooks/useUpdatePromotionBudgetAmount';

import styles from './styles.module.css';

const options = [
	{ label: 'USD', value: 'USD' },
	{ label: 'INR', value: 'INR' },
];

function BudgetGenerator({
	budgetId = '',
	amount = '',
	budgetValue = '',
	setBudgetValue = () => {},
	refetchDashboard = () => {},
	selectedCurrency = 'USD',
	setSelectedCurrency = () => {},
}) {
	const [isEdit, setIsEdit] = useState(false);
	const { updateBudgetAmount = () => {} } = useUpdatePromotionBudgetAmount({
		budgetId, budgetValue, refetchDashboard,
	});

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
							onChange={(e) => {
								setBudgetValue(e);
							}}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMTick />}
							themeType="primary"
							onClick={() => {
								updateBudgetAmount();
								setIsEdit(false);
							}}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMCross />}
							themeType="primary"
							onClick={() => {
								refetchDashboard();
								setIsEdit(false);
							}}
						/>
					</div>
				) : (
					<div className={styles.content}>
						<div className={styles.main_text}>{selectedCurrency + amount}</div>
						<ButtonIcon
							size="md"
							icon={<IcMEdit />}
							disabled={false}
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
						value={selectedCurrency}
						onChange={(e) => { setSelectedCurrency(e); }}
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
