import { Button, CheckboxGroup, Input } from '@cogoport/components';
import { IcMCross, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import filterOptions from '../../../../../configurations/user-activity-filter-options';

import styles from './styles.module.css';

function Filters({
	setFilterVisible = () => {},
	activityTab,
	filters: appliedFilters = null,
	handleFilters = () => {},
	handleReset = () => {},
	loading = false,
}) {
	const { FILTERS_MAPPING } = filterOptions();
	const [values, setValues] = useState(null);

	const emptyCheck = isEmpty(values);

	useEffect(() => {
		setValues(appliedFilters);
	}, [appliedFilters]);

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
						onChange={setValues}
						value={values || ''}
					/>
				</>
			) : (
				<CheckboxGroup
					options={FILTERS_MAPPING[activityTab]}
					onChange={setValues}
					value={values || []}
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
				<Button
					size="sm"
					themeType="accent"
					onClick={() => handleFilters(values)}
					disabled={emptyCheck}
					loading={loading}
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default Filters;
