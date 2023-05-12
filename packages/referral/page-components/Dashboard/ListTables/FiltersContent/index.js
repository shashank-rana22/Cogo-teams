import { RadioGroup, Button } from '@cogoport/components';
import React, { useState } from 'react';

import filterOptopns from '../../../../configurations/filter-options';

import styles from './styles.module.css';

const func = () => {};
function FiltersContent({
	setFilterVisible = func,
	filter = '',
	setFilter = func,
	getListReferrals = func,
	setListPagination = func,
}) {
	const [tempStatus, setTempStatus] = useState(filter);

	const handleReset = () => {
		setFilter();
		setListPagination(1);
		setFilterVisible(false);
		getListReferrals();
		setTempStatus(null);
	};

	const handleFilters = () => {
		setListPagination(1);
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
