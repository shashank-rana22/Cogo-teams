import { MultiSelect } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useGetCustomerList from './hooks/useGetCustomerList';
import ListView from './ListView';
import Stats from './Stats';
import styles from './styles.module.css';

interface FilterInterface {
	service?: string[];
	entity?: string[];
	search?: string;
	pageIndex?: number;
}

function FinancialSummary() {
	const [filters, setFilters] = useState<FilterInterface>({});
	const serviceOptions = GLOBAL_CONSTANTS.shipment_types;
	const entityOptions = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => (
		{ label: String(entity), value: String(entity) }
	));

	const { data, loading } = useGetCustomerList({ filters, setFilters });

	return (
		<div>
			<div className={styles.filters}>
				<MultiSelect
					value={filters?.service}
					onChange={(val) => setFilters((prev) => ({ ...prev, service: val }))}
					placeholder="Service"
					options={serviceOptions}
					className={styles.single_filter}
					prefix={null}
					isClearable
				/>
				<MultiSelect
					value={filters?.entity}
					onChange={(val) => setFilters((prev) => ({ ...prev, entity: val }))}
					placeholder="Entity"
					options={entityOptions}
					className={styles.single_filter}
					prefix={null}
					isClearable
				/>
			</div>

			<div className={styles.stats_container}>
				<Stats filters={filters} />
			</div>

			<ListView
				filters={filters}
				setFilters={setFilters}
				data={data}
				loading={loading}
			/>
		</div>
	);
}

export default FinancialSummary;
