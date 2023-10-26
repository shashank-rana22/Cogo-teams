import React from 'react';

import Expense from './Expense';
import ExpenseHistory from './History';
import styles from './styles.module.css';

function ExpenseManagement() {
	return (
		<div className={styles.container}>
			<Expense />
			<ExpenseHistory />
		</div>
	);
}

export default ExpenseManagement;
