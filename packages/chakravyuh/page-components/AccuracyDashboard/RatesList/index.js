import { Pagination, Table, cl } from '@cogoport/components';
import React from 'react';

import { LIST_DATA } from '../../../constants/supply_rates_data';
import useSupplyRatesListTable from '../../../hooks/useListTable';

import styles from './styles.module.css';

function SupplyRates({
	globalFilters = {}, page = 1, totalCount = 8, pageSize = 10, getNextPage = () => {},
	className = '', heading = null,
}) {
	const { service_type = 'fcl' } = globalFilters;
	const { columns } = useSupplyRatesListTable(service_type);
	return (
		<div className={cl`${styles.main_container} ${className}`}>
			{heading && <p className={styles.main_title}>{heading}</p>}
			<Table columns={columns} data={LIST_DATA} className={styles.table_container} />
			<div className={styles.pagination_container} id="rnp_role">
				<Pagination
					type="table"
					currentPage={page}
					totalItems={totalCount}
					pageSize={pageSize}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default SupplyRates;
