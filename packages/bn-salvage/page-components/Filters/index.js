import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useContext } from 'react';

import FILTERS from '../../config/filters.json';
import { BNSalvageContext } from '../../context/BNSalvageContext';

import styles from './styles.module.css';

export default function Filters({ children }) {
	const { filters, setFilters } = useContext(BNSalvageContext);
	const handleFilterChange = (name, val) => {
		setFilters((prev) => ({
			...prev,
			[name] : val,
			page   : 1,
		}));
	};

	return (
		<div className={styles.filters_container}>
			<div className={styles.primary_filters}>
				{FILTERS.map((filter) => (
					<AsyncSelect
						key={filter.name}
						value={filters[filter.name]}
						onChange={(val) => handleFilterChange(filter.name, val)}
						{...filter}
					/>
				))}
			</div>

			{children}
		</div>
	);
}
