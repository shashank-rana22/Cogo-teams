import { Button, Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import FILTERS_CONTROLS from '../../../../config/OCEAN_FILTERS_CONTROLS.json';

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
		.some(([key, val]) => !isEmpty(val) && key !== 'page');

	const applyPopoverFilters = () => {
		setFilters({ ...filters, ...formValues, page: 1 });
		setShowPopover(false);
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

			<div>Trade Type</div>
			<Select
				size="sm"
				onChange={(val) => setValue('trade_type', val)}
				options={FILTERS_CONTROLS.trade_type}
				value={formValues.trade_type || undefined}
			/>

			<div>Shipper Name</div>
			<AsyncSelect
				asyncKey="organizations"
				initialCall={false}
				onChange={(val) => setValue('importer_exporter_id', val)}
				value={formValues.importer_exporter_id || undefined}
				placeholder="Select Shipper Name"
				muiltiple
				size="sm"
				params={{
					filters: {
						account_type : 'importer_exporter',
						status       : 'active',
						kyc_status   : 'verified',
					},
				}}
			/>

			<div>State</div>
			<Select
				size="sm"
				onChange={(val) => setValue('state', val)}
				options={FILTERS_CONTROLS.state}
				value={formValues.state || undefined}
			/>

			<div>Job Closed</div>
			<Select
				size="sm"
				onChange={(val) => setValue('is_job_closed', val)}
				options={FILTERS_CONTROLS.is_job_closed}
				value={formValues.is_job_closed}
			/>
		</div>

	);
}

export default FilterContent;
