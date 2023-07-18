import { Pagination, Table, cl } from '@cogoport/components';
import React from 'react';

import { LIST_DATA } from '../../../constants/supply_rates_data';
import useSupplyRatesListTable from '../../../hooks/useListTable';

import styles from './styles.module.css';

function SupplyRates({
	filters = {}, page = 1, totalCount = 8, pageSize = 10, getNextPage = () => {},
	className = '',
}) {
	const { service_type = 'fcl', pieChartView = 'default' } = filters;
	const { columns } = useSupplyRatesListTable(service_type);

	if (pieChartView !== 'default') {
		return (
			<div className={cl`${styles.main_container} ${className}`}>
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
	return null;
}

export default SupplyRates;
