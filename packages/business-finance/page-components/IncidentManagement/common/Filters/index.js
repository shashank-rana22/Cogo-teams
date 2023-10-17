import { useTranslation } from 'next-i18next';
import React from 'react';

import SearchInput from '../SearchInput';

import styles from './styles.module.css';
import { getElements } from './utils/getElements';
import { getFilterControls } from './utils/getFilterControls';

const DEFAULT_PAGE = 1;

function Filters({
	isSettlementExecutive,
	activeTab,
	filters,
	onChangeFilters = (v) => v,
	entityCode = '',
}) {
	const { search } = filters || {};
	const { t } = useTranslation(['incidentManagement']);
	const filterControls = getFilterControls({ activeTab, isSettlementExecutive, t, entityCode, filters });

	return (
		<section className={styles.container} id="filters">
			<div className={styles.select_container}>
				{filterControls.map((control) => {
					const Element = getElements(control.type);
					return (
						<div className={styles.element} key={control.name}>
							<Element
								key={control.name}
								className={styles.select}
								value={filters[control.name]}
								onChange={(value) => {
									let val = value;
									if (control?.type === 'toggle') {
										val = value?.target?.checked;
									}

									onChangeFilters({
										...filters,
										[control.name] : val || undefined,
										page           : DEFAULT_PAGE,
									});
								}}
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
				size="md"
				placeholder={t('incidentManagement:invoice_proforma_search')}
			/>
		</section>
	);
}

export default Filters;
