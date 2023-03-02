import { Button, CheckboxGroup, Input } from '@cogoport/components';
import { IcMCross, IcMRefresh } from '@cogoport/icons-react';
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
	handleReset = () => {},
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

			{activityTab === 'transactional' ? (
				<>
					<div className={styles.label}>Enter Serial ID</div>
					<Input
						size="sm"
						placeholder="Enter serial id"
						options={FILTERS_MAPPING[activityTab]}
						onChange={setFilters}
						value={filters}
					/>
				</>
			) : (
				<CheckboxGroup
					options={FILTERS_MAPPING[activityTab]}
					onChange={setFilters}
					value={filters}
					className={styles.filters}
				/>
			)}

			<div className={styles.actions}>
				<Button size="sm" themeType="tertiary" onClick={handleReset}>
					<div className={styles.refresh_icon}>
						<IcMRefresh width={10} height={10} />
					</div>
					Reset Status

				</Button>
				<Button size="sm" themeType="accent" onClick={handleFilters} disabled={emptyCheck}>Apply</Button>
			</div>
		</div>
	);
}

export default Filters;
