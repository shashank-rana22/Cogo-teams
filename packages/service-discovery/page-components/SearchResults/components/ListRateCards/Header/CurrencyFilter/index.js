import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

function Currency({
	filters = {},
	setFilters = () => {},
	label = 'Currency:',
	filterKey = 'currency',
}) {
	const currencyOptions = useMemo(() => (
		Object.keys(GLOBAL_CONSTANTS.currency_code).map((currency) => ({
			label : currency,
			value : currency,
		}))
	), []);

	return (
		<div className={styles.container}>
			<strong style={{ marginRight: 6 }}>{label}</strong>

			<Select
				name="currency"
				value={filters?.currency || 'USD'}
				options={currencyOptions || []}
				onChange={(val) => setFilters({ [filterKey]: val })}
			/>
		</div>
	);
}

export default Currency;
