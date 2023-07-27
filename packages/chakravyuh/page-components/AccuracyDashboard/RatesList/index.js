import { Pagination, Table, cl } from '@cogoport/components';
import React from 'react';

import getListConfig from '../../../configurations/getListConfig';
import useListFclFreightRateStatistics from '../../../hooks/useListFclFreightRateStatistics';

import styles from './styles.module.css';

function SupplyRates({
	globalFilters = {}, pageSize = 10, className = '', heading = null,
}) {
	const { service_type = 'fcl' } = globalFilters;
	const { data, page, setPage } = useListFclFreightRateStatistics({ filters: globalFilters });
	const { total_count = 0, list = [] } = data || {};
	const { columns } = getListConfig(service_type);
	return (
		<div className={cl`${styles.main_container} ${className}`}>
			{heading && <p className={styles.main_title}>{heading}</p>}
			<Table columns={columns} data={list} className={styles.table_container} />
			<div className={styles.pagination_container} id="rnp_role">
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageSize}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default SupplyRates;
