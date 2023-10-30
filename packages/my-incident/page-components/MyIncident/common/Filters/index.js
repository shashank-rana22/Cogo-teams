import React from 'react';

import { ELEMENTS_MAPPING } from '../../utils/getElements';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';
import { filterControls } from './utils/controls';

function Filters({
	filters,
	onChangeFilters = (v) => v,
	activeTab,
}) {
	const { search } = filters || {};

	return (
		<section className={styles.container} id="filters">
			<div className={styles.select_container}>
				{filterControls(activeTab).map((control) => {
					// const Element: any = getElements(control.type);
					const Element = ELEMENTS_MAPPING[control.type];
					return (
						<Element
							key={control.name}
							className={styles.select}
							value={filters[control.name]}
							onChange={(value) => onChangeFilters({
								...filters,
								[control.name] : value || undefined,
								page           : 1,
							})}
							{...control}
						/>
					);
				})}
			</div>
			<SearchInput
				value={search || ''}
				onChange={(value) => onChangeFilters({
					...filters,
					search: value || undefined,
				})}
				size="md"
				placeholder="Search by Incident Id/Company Name "
			/>
		</section>
	);
}

export default Filters;
