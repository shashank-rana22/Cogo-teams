import { Select, MultiSelect } from '@cogoport/components';
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

	const getElements = (type) => {
		switch (type) {
			case 'select':
				return Select;
			case 'multiSelect':
				return MultiSelect;
			default:
				return null;
		}
	};

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
					const Element = getElements(control.type);
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
						<Element
							{...control}
							className={styles.select}
							value={filters?.[control?.name] || ''}
							onChange={(value) => onChangeFilters({ [control?.name]: value || undefined })}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Filters;
