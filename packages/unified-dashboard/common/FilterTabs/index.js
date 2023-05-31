import { Button } from '@cogoport/components';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { revenueFilters } from '../../constants/revenue-filters';

import styles from './styles.module.css';

function FilterTabs({
	setFilters = {},
	selectedFilterTab = 'month',
	setSelectedFilterTab = () => {},
	loading,
}) {
	const onSelectFilterTab = (value) => {
		setSelectedFilterTab(value);
		setFilters((prevF) => ({
			...prevF,
			start_date  : null,
			end_date    : null,
			period_type : value,
		}));
	};

	return (
		<>
			{revenueFilters.map((item) => (
				<Button
					key={uuidv4()}
					disabled={loading}
					className={item.value === selectedFilterTab
						? `${styles.active} ${styles.revenue_filter_btn}` : `${styles.revenue_filter_btn}`}
					onClick={() => onSelectFilterTab(item.value)}
				>
					{item.label}
				</Button>
			))}
		</>
	);
}

export default FilterTabs;
