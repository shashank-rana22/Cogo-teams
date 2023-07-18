import { Pagination, Table, cl } from '@cogoport/components';
import React from 'react';

import { LIST_DATA } from '../../../constants/supply_rates_data';
import useSupplyRatesListTable from '../../../hooks/useListTable';

import styles from './styles.module.css';

function SupplyRates({ page = 1, totalCount = 8, pageSize = 10, getNextPage = () => {}, className = '' }) {
	const { COLUMNS } = useSupplyRatesListTable();

	return (
		<div className={cl`${styles.main_container} ${className}`}>
			<Table columns={COLUMNS} data={LIST_DATA} className={styles.table_container} />
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
