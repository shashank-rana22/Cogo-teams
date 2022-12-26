import { Select } from '@cogoport/components';
import React from 'react';

import SearchInput from '../../../common/SearchInput';

import styles from './styles.module.css';
import { controls } from './utils/controls';

function Filters({
	filters = {},
	onChangeFilters = () => {},
	stakeHolderType = '',
}) {
	const modifiedControls = controls(filters?.role_functions || []);

	return (
		<section className={styles.container} id="rnp_role_list_filters_container">
			<SearchInput
				value={filters?.q || ''}
				onChange={(value) => onChangeFilters({ q: value || undefined })}
				size="md"
				placeholder="Search Role"
			/>
			<div className={styles.select_container} id="rnp_role_list_filters_select_container">
				{modifiedControls?.map((control) => {
					if (
						control.name === 'stakeholder_id'
						&& ['cogoport', 'customer'].includes(stakeHolderType)
					) {
						return null;
					}
					if (control.name === 'navigation' && stakeHolderType === 'customer') {
						return null;
					}
					return (
						<Select
							className={styles.select}
							{...control}
							value={filters?.[control?.name] || ''}
							onChange={({ value }) => onChangeFilters({ [control?.name]: value || undefined })}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Filters;
