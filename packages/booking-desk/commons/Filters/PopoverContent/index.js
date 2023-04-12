import { Toggle, Button, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CONTROLS from '../../../config/CONTROLS_CONFIG.json';
import TABS_CONFIG from '../../../config/TABS_CONFIG.json';
import applyPopoverFilters from '../../../helpers/applyPopoverFilters';

import styles from './styles.module.css';

export default function PopoverContent({ stateProps, setShowPopover }) {
	const { filters, setFilters, activeTab } = stateProps;
	const { q, page, ...defaultFilters } = filters;

	const [formValues, setFormValues] = useState(defaultFilters);

	const tabs = TABS_CONFIG[formValues.shipment_type];

	const { isCriticalVisible } = tabs.find((tab) => tab.name === activeTab) || tabs[0];

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

			<Select
				size="sm"
				onChange={(val) => setValue('shipment_type', val)}
				options={CONTROLS.shipment_types}
				value={formValues.shipment_type}
			/>

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

			{isCriticalVisible ? (
				<Toggle
					size="md"
					offLabel="Critical SIDs"
					checked={formValues.isCriticalOn}
					onChange={() => setValue('isCriticalOn', !formValues.isCriticalOn)}
				/>
			) : null}
		</div>
	);
}
