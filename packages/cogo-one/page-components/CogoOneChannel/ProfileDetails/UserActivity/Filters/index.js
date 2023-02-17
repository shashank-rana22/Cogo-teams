import { Button, CheckboxGroup } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import filterOptions from '../../../../../configurations/user-activity-filter-options';

import styles from './styles.module.css';

function Filters({
	setFilterVisible = () => {},
	activityTab,
	filters,
	setFilters,
	handleFilters = () => {},
}) {
	const { FILTERS_MAPPING } = filterOptions();

	const emptyCheck = isEmpty(filters);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters
				</div>

				<div className={styles.styled_icon}>
					<IcMCross width={20} height={20} onClick={() => setFilterVisible(false)} />
				</div>
			</div>

			<CheckboxGroup
				options={FILTERS_MAPPING[activityTab]}
				onChange={setFilters}
				value={filters}
				className={styles.filters}
			/>

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent" onClick={handleFilters()} disabled={emptyCheck}>Apply</Button>
			</div>
		</div>
	);
}

export default Filters;
