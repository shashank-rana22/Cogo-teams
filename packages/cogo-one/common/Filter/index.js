/* eslint-disable max-len */
import { Button, RadioGroup } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Filter({
	setFilterVisible = () => {},
	// activityTab,
	filters,
	setFilters,
	// handleFilters = () => {},

}) {
	const ViewFilter = [
		{
			label : 'Self',
			value : 'self',
		},
		{
			label : 'Team',
			value : 'team',
		},
		{
			label : ' Across All',
			value : 'across_all',
		},
	];

	const emptyCheck = isEmpty(filters);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filter
				</div>

				<div className={styles.styled_icon}>
					<IcMCross width={20} height={20} onClick={() => setFilterVisible(false)} />
				</div>
			</div>

			<RadioGroup
				options={ViewFilter}
				onChange={setFilters}
				value={filters}
				className={styles.filters_list}

			/>

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent" disabled={emptyCheck}>Apply</Button>
			</div>
		</div>
	);
}

export default Filter;
