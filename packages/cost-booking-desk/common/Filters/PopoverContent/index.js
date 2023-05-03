import { Button, Chips, DateRangepicker } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CONTROLS from '../../../config/CONTROLS_CONFIG.json';
import applyPopoverFilters from '../../../helpers/applyPopoverFilters';
import { dateTypeControl } from '../../../helpers/dateTypeControl';

import styles from './styles.module.css';

export default function PopoverContent({ stateProps, setShowPopover, dateFilters, setDateFilters }) {
	const { filters = {}, setFilters = () => {} } = stateProps;
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
			<div>
				<h2>Trade Type</h2>
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
			<div className={styles.filters_div}>
				<p className={styles.field_label}>Date Type</p>
				<Chips
					size="md"
					className={styles.chips}
					items={[
						{
							key      : 'schedule_arrival',
							disabled : false,
							children : 'ETA',
						},
						{
							key      : 'schedule_departure',
							disabled : false,
							children : 'ETD',
						},
					]}
					selectedItems={dateFilters?.dateType}
					onItemChange={(e) => setDateFilters({ ...dateFilters, dateType: e })}
				/>

				{dateFilters?.dateType && (
					<>
						<p className={styles.field_label}>{dateFilters.dateType === 'etd' ? 'ETD' : 'ETA'}</p>

						<div className={styles.pills_container}>
							{dateTypeControl.map((val) => (
								<Chips
									size="md"
									items={[
										{
											key      : val.value,
											disabled : false,
											children : val.label,
											tooltip  : false,
										},
									]}
									selectedItems={dateFilters.range}
									onItemChange={(e) => setDateFilters({ ...dateFilters, range: e, customDate: {} })}
								/>
							))}
						</div>
					</>
				)}

				{dateFilters?.dateType && dateFilters.range === 'custom' && (
					<div style={{ marginTop: '10px' }}>
						<DateRangepicker
							name="date"
							onChange={(e) => {
								setDateFilters({ ...dateFilters, customDate: e });
							}}
							value={{
								startDate: dateFilters?.customDate.startDate
									? new Date(dateFilters.customDate.startDate) : '',
								endDate: dateFilters?.customDate.endDate
									? new Date(dateFilters.customDate.endDate) : '',
							}}
							isPreviousDaysAllowed
							showTimeSelect
							shouldCloseOnSelect
							dateFormat="dd MMM yyyy, hh:mm aaa"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
