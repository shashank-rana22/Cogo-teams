import { RadioGroup, Button } from '@cogoport/components';
import React, { useState } from 'react';

import filterOptopns from '../../../../configurations/filter-options';

import styles from './styles.module.css';

function FiltersContent({
	setFilterVisible = () => {},
	filter = '',
	setFilter = () => {},
	// listReferrals = () => {},
	// setPagination = () => {},
}) {
	const [tempStatus, setTempStatus] = useState(filter);

	const handleReset = () => {
		setFilter();
		// setPagination(1);
		setFilterVisible(false);
		// listReferrals();
		setTempStatus(null);
	};

	const handleFilters = () => {
		// setPagination(1);
		setFilter(tempStatus);
		setFilterVisible(false);
	};

	return (
		<>

			<RadioGroup
				options={filterOptopns}
				onChange={setTempStatus}
				value={tempStatus}
				className={styles.filters_container}
			/>

			<div className={styles.actions}>
				<Button size="sm" themeType="tertiary" onClick={handleReset}>
					Reset Status
				</Button>
				<Button size="sm" themeType="accent" onClick={handleFilters}>
					Apply
				</Button>
			</div>
		</>
	);
}

export default FiltersContent;
