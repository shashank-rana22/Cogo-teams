import React from 'react';

import { FilterProps } from '../interface';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';
import { getElements } from './utils/getElements';
import { getFilterControls } from './utils/getFilterControls';

interface Props {
	isSettlementExecutive:boolean
	activeTab?:string
	filters: FilterProps;
	onChangeFilters: (v: object) => void;
}

function Filters({
	isSettlementExecutive,
	activeTab,
	filters,
	onChangeFilters = (v) => v,
}: Props) {
	const { search } = filters || {};

	const filterControls = getFilterControls({ activeTab, isSettlementExecutive });

	return (
		<section className={styles.container} id="filters">
			<div className={styles.select_container}>
				{filterControls.map((control) => {
					const Element = getElements(control.type);
					return (
						<div className={styles.element}>
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
						</div>
					);
				})}
			</div>
			<SearchInput
				value={search || ''}
				onChange={(value) => onChangeFilters({
					...filters,
					search: value || undefined,
				})}
				size="sm"
				placeholder="Search by Invoice/Proforma Number "
			/>
		</section>
	);
}

export default Filters;
