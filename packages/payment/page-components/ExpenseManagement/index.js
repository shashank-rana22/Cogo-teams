import React, { useState } from 'react';

import useGetExpenseData from '../../hooks/useGetExpenseData';

import Expense from './Expense';
import ExpenseHistory from './History';
import styles from './styles.module.css';

function ExpenseManagement() {
	const [toggleValue, setToggleValue] = useState(true);
	const handleSetToggle = (e) => {
		setToggleValue(e?.target?.checked);
	};
	const { loading, data } = useGetExpenseData({ toggleValue });
	const { hr_view } = data || '-';

	return (
		<div className={styles.container}>
			<Expense toggleValue={toggleValue} handleSetToggle={handleSetToggle} loading={loading} data={data} />
			<ExpenseHistory toggleValue={toggleValue} hr_view={hr_view} />
		</div>
	);
}

export default ExpenseManagement;
