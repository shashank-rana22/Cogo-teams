import { Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useContext } from 'react';

import FILTERS from '../../config/filters.json';
import { BNSalvageContext } from '../../context/BNSalvageContext';

import styles from './styles.module.css';

const geo = getGeoConstants();

const containerTypeOptions = geo?.options?.freight_container_types || [];

export default function Filters({ children }) {
	const { filters, setFilters } = useContext(BNSalvageContext);

	const handleFilterChange = (name, newValue) => {
		const { [name]: oldValue, ...restFilters } = filters || {};

		if (oldValue || newValue) {
			setFilters({
				...restFilters,
				...(newValue && { name: newValue }),
				page: 1,
			});
		}
	};

	return (
		<div className={styles.filters_container}>
			<div className={styles.primary_filters}>
				{FILTERS.map((filter) => (filter.type === 'select'
					? (
						<Select
							key={filter.name}
							value={filters[filter.name]}
							onChange={(val) => handleFilterChange(filter.name, val)}
							{...{
								...filter,
								...(filter.name === 'container_type' && { options: containerTypeOptions }),
							}}
						/>
					)
					: (
						<AsyncSelect
							key={filter.name}
							value={filters[filter.name]}
							onChange={(val) => handleFilterChange(filter.name, val)}
							{...filter}
						/>
					)
				))}
			</div>

			{children}
		</div>
	);
}
