import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useGetCustomerList from './hooks/useGetCustomerList';
import ListView from './ListView';
import Stats from './Stats';
import styles from './styles.module.css';

function FinancialSummary() {
	const [filters, setFilters] = useState({});
	const serviceOptions = GLOBAL_CONSTANTS.shipment_types;
	const { data, loading } = useGetCustomerList({ filters, setFilters });

	return (
		<div>
			<div className={styles.filters}>
				<Select
					value={filters?.service}
					onChange={(val) => setFilters({ ...filters, service: val })}
					placeholder="Service"
					options={serviceOptions}
					className={styles.single_filter}
					isClearable
				/>
			</div>

			<div className={styles.stats_container}>
				<Stats />
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
