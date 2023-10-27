import React, { useState } from 'react';

import Expense from './Expense';
import ExpenseHistory from './History';
import styles from './styles.module.css';

function ExpenseManagement() {
	const [toggleValue, setToggleValue] = useState(true);
	const handleSetToggle = (e) => {
		setToggleValue(e?.target?.checked);
	};

	return (
		<div className={styles.container}>
			<Expense toggleValue={toggleValue} handleSetToggle={handleSetToggle} />
			<ExpenseHistory toggleValue={toggleValue} />
		</div>
	);
}

export default ExpenseManagement;
