import { Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Filters({
	query,
	onChange,
	placeholder = 'Search by File name, Shipping line, Email Subject and Date.',
}) {
	return (
		<div className={styles.container}>
			<Input
				value={query}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default Filters;
