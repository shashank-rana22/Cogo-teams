import { Button, Select, Toggle } from '@cogoport/components';
import React from 'react';

import { getOptions } from '../../../../../constants/visualization-filter-controls';

import styles from './styles.module.css';

function Headers({
	filterValues = {},
	setFilterValues = () => {},
	setSelectedBarData = () => {},
	setKamOwnerId = () => {},
	setToggleValue = () => {},
	toggleValue = false,
	loading = false,
	setFilters = () => {},
}) {
	const { entity_code, bifurcation_type, period_type, view_type } = filterValues || {};

	const handleApply = (val) => {
		setFilterValues({
			...filterValues,
			...val,
			view_type,
		});
		setSelectedBarData();
		setKamOwnerId([]);
		setFilters((prev) => ({ ...prev, page_number: 1 }));
	};

	const handleReset = () => {
		setFilterValues({
			...filterValues,
			entity_code      : undefined,
			bifurcation_type : 'overall',
		});
		setSelectedBarData();
		setKamOwnerId([]);
	};
	return (
		<div className={styles.container}>
			<Toggle
				offLabel="Visualization"
				onLabel="DSO"
				value={toggleValue}
				onChange={() => setToggleValue((prev) => !prev)}
				disabled={loading}
			/>

			{!toggleValue && (
				<div className={styles.flex}>
					<div>
						<Select
							placeholder="Select Duration Type"
							defaultOptions
							onChange={(e) => handleApply({ period_type: e })}
							value={period_type}
							size="sm"
							options={[
								{ label: 'Week On Week', value: 'week' },
								{ label: 'Month On Month', value: 'month' },
							]}
							style={{
								width       : '150px',
								marginRight : '20px',
							}}
						/>
					</div>
					<div
						style={{
							display     : 'flex',
							marginRight : '20px',
						}}
					>
						<Select
							placeholder="Select Bifurcation Type"
							onChange={(e) => handleApply({ bifurcation_type: e })}
							value={bifurcation_type}
							size="sm"
							options={getOptions(view_type)}
							style={{ width: '150px' }}
						/>
						{(bifurcation_type !== 'overall' || entity_code) && (
							<Button size="md" themeType="primary" onClick={handleReset} style={{ marginLeft: '20px' }}>
								Reset
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Headers;
