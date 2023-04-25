import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CONTROLS from '../../../config/CONTROLS_CONFIG.json';
import applyPopoverFilters from '../../../helpers/applyPopoverFilters';

import styles from './styles.module.css';

export default function PopoverContent({ stateProps, setShowPopover }) {
	const { filters, setFilters } = stateProps;
	const { q, page, ...defaultFilters } = filters;

	const [formValues, setFormValues] = useState(defaultFilters);

	const isFiltersApplied = Object.entries(defaultFilters)
		.some(([key, val]) => ((key === 'isCriticalOn')
			? !!val
			: !isEmpty(val) && !['shipment_type', 'page'].includes(key)));

	const isFiltersChanged = Object.keys(formValues)
		.some((filterKey) => defaultFilters[filterKey] !== formValues[filterKey]);

	const clearFilters = () => {
		setFilters({ shipment_type: filters.shipment_type, page: 1 });
		setShowPopover(false);
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

	const setValue = (key, value) => {
		setFormValues({ ...formValues, [key]: value });
	};

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

			<div className={styles.trade_type_container}>
				{CONTROLS.trade_types.map(({ label, value }) => (
					<Button
						size="md"
						className={formValues.trade_type === value ? '' : styles.inactive}
						onClick={() => setValue('trade_type', value)}
					>
						{label}
					</Button>
				))}
			</div>

		</div>
	);
}
