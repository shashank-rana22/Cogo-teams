import { Button, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FilterContent({ stateProps, setShowPopover = () => {} }) {
	const { filters, setFilters } = stateProps;
	const { q, page, ...defaultFilters } = filters;

	const [formValues, setFormValues] = useState(defaultFilters);

	const clearFilters = () => {
		setFilters({ shipment_type: filters.shipment_type, page: 1 });
		setShowPopover(false);
	};

	const isFiltersChanged = Object.keys(formValues)
		.some((filterKey) => defaultFilters[filterKey] !== formValues[filterKey]);

	const isFiltersApplied = Object.entries(defaultFilters)
		.some(([key, val]) => !isEmpty(val) && !['shipment_type', 'page'].includes(key));

	const applyPopoverFilters = () => {
		setFilters({ ...filters, ...formValues, page: 1 });
	};
	const setValue = (key, value) => {
		setFormValues({ ...formValues, [key]: value });
	};

	const actionButtons = [
		{
			label     : 'Clear',
			onClick   : clearFilters,
			disabled  : !isFiltersApplied && !isFiltersChanged,
			themeType : 'secondary',
		},
		{
			label     : 'Apply',
			onClick   : () => applyPopoverFilters({ stateProps, formValues, setShowPopover }),
			disabled  : !isFiltersChanged,
			themeType : 'primary',
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.action_button_container}>
				{actionButtons.map((button) => (
					<Button
						size="md"
						className={`${styles.action_button} ${styles.disabled_button}`}
						{...button}
					>
						{button.label}
					</Button>
				))}
			</div>

			<Select
				size="sm"
				onChange={(val) => setValue('shipment_type', val)}
				value={formValues.shipment_type}
			/>

		</div>

	);
}

export default FilterContent;
