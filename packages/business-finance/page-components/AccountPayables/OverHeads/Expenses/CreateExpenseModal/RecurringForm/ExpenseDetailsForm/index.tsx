import React from 'react';

import Filter from '../../../../../../commons/Filters';
import { recurringExpenseDetails } from '../../../../Controls/recurringExpenseDetails';

import styles from './styles.module.css';

interface Props {
	filters:object,
	setFilters:(p: object) => void
}

function ExpenseDetailsForm({ filters, setFilters }:Props) {
	return (
		<div>

			<Filter
				controls={recurringExpenseDetails}
				filters={filters}
				setFilters={setFilters}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;
