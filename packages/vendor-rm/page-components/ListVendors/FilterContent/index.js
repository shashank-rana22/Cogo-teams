import { Input, Select, Button } from '@cogoport/components';
import { useState } from 'react';

import CATEGORY_OPTIONS from '../../OnBoardVendor/VendorServices/utils/category-options';

import styles from './styles.module.css';

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
					placeholder="Choose pan/gst ..."
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
					options={CATEGORY_OPTIONS}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="secondary"
					onClick={() => {
						setShowFilter(false);
					}}
					className="secondary sm"
				>
					Close
				</Button>

				<Button
					type="button"
					onClick={() => {
						setParams((pv) => ({
							...pv,
							filters,
						}));
						setShowFilter(false);
					}}
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
