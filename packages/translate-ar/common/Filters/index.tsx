import { Select, MultiSelect } from '@cogoport/components';
import React from 'react';

import SearchInput from '../SearchInput';

import styles from './styles.module.css';
import { filterControls } from './utils/controls';

function Filters({
	filters = { q: '' },
	onChangeFilters = (v) => v,
}) {
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
		<section className={styles.container} id="filters">
			<div className={styles.select_container}>
				{filterControls?.map((control) => {
					const Element = getElements(control.type);
					return (
						<Element
							key={control.name}
							className={styles.select}
							value={filters?.[control?.name]}
							onChange={(value) => onChangeFilters({ [control?.name]: value || undefined })}
							{...control}
						/>
					);
				})}
			</div>
			<SearchInput
				value={filters?.q || ''}
				onChange={(value) => onChangeFilters({ q: value || undefined })}
				size="md"
				placeholder="Search by Invoice/Proforma Number "
			/>
		</section>
	);
}

export default Filters;
