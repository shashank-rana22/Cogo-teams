import { ButtonIcon, Select, Input } from '@cogoport/components';
import { IcMEdit, IcMTick, IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const options = [
	{ label: 'USD', value: 'USD' },
	{ label: 'INR', value: 'INR' },
];

function BudgetGenerator({ amount = '', onChangeCurrency = () => {} }) {
	const [isEdit, setIsEdit] = useState(false);
	const [budgetValue, setBudgetValue] = useState(amount);
	const [value, setValue] = useState('USD');

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.title}>Budget:</div>
				{isEdit ? (
					<div className={styles.content}>
						<Input
							className={styles.mainText}
							size="md"
							placeholder="Enter Budget amount"
							value={budgetValue}
							onChange={(e) => {
								setBudgetValue(e.value);
							}}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMTick />}
							disabled={false}
							themeType="primary"
							onClick={() => {
								// TODO
							}}
						/>
						<ButtonIcon
							size="md"
							icon={<IcMCross />}
							disabled={false}
							themeType="primary"
							onClick={() => {
								setIsEdit(false);
							}}
						/>
					</div>
				) : (
					<div className={styles.content}>
						<div className={styles.mainText}>{amount}</div>
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
				<div className={styles.currencyText}>Currency:</div>
				<div className={styles.currencySelect}>
					<Select
						value={value}
						onChange={(e) => { setValue(e.value); onChangeCurrency(); }}
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
