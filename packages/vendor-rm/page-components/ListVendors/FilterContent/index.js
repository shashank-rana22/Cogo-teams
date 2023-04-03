import { Input, Select, Button } from '@cogoport/components';
import { useState } from 'react';

import CATEGORY_OPTIONS from '../../utils/category-options';

import styles from './styles.module.css';
import filterSubCategoryOptions from './utils/filter-sub-category-options';

function FilterContent({ setParams = () => {}, setShowFilter = () => {} }) {
	const [filters, setFilters] = useState({ status: 'active' });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Filters</div>

				<Button
					type="button"
					onClick={() => {
						setParams({ filters: { status: 'active' } });
						setFilters({ status: 'active' });
						setShowFilter(false);
					}}
					themeType="secondary"
				>
					Clear All
				</Button>
			</div>

			<div className={styles.select_container}>
				<div className={styles.label}>Registration Number</div>
				<Input
					className="primary sm"
					value={filters?.registration_number || ''}
					onChange={(value) => setFilters((prev) => ({ ...prev, registration_number: value }))}
					clearable
					placeholder="Choose PAN/GST ..."
				/>
			</div>

			<div className={styles.select_container}>
				<div className={styles.label}>Category</div>
				<Select
					value={filters?.category || ''}
					onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
					placeholder="Choose Category..."
					options={CATEGORY_OPTIONS}
				/>
			</div>

			<div className={styles.select_container}>
				<div className={styles.label}>Sub-Category</div>
				<Select
					value={filters?.sub_category || ''}
					onChange={(value) => setFilters((prev) => ({ ...prev, sub_category: value }))}
					placeholder="Choose Sub Category..."
					options={filterSubCategoryOptions}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					onClick={() => {
						setParams((pv) => ({
							...pv,
							filters,
						}));
						setShowFilter(false);
					}}
					style={{
						marginLeft: '8px',
					}}
					disabled={!filters?.category && !filters?.sub_category && !filters?.registration_number}
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
