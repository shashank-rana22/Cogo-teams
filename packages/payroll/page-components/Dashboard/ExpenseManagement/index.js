import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useGetExpenseData from '../../../hooks/useGetExpenseData';

import Expense from './Expense';
import ExpenseHistory from './History';
import styles from './styles.module.css';

function ExpenseManagement() {
	const [toggleValue, setToggleValue] = useState(false);
	const currentYear = new Date().getFullYear();
	const [value, setValue] = useState(`${currentYear}-${currentYear + GLOBAL_CONSTANTS.one}`);
	const handleSetToggle = (e) => {
		setToggleValue(e?.target?.checked);
	};
	const { loading, data } = useGetExpenseData({ toggleValue, value });
	const { hr_view } = data || '-';

	return (
		<div className={styles.container}>
			<Expense
				toggleValue={toggleValue}
				setValue={setValue}
				value={value}
				handleSetToggle={handleSetToggle}
				loading={loading}
				data={data}
			/>
			<ExpenseHistory
				value={value}
				toggleValue={toggleValue}
				hr_view={hr_view}
			/>
		</div>
	);
}

export default ExpenseManagement;
