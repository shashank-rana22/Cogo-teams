import { Pagination, Placeholder, Table, cl } from '@cogoport/components';
import React from 'react';

import getListConfig from '../../../configurations/getListConfig';
import useListFclFreightRateStatistics from '../../../hooks/useListFclFreightRateStatistics';

import styles from './styles.module.css';

const LOADING_ROWS = 10;

function SupplyRates({
	globalFilters = {}, pageSize = 10, className = '', heading = null, activeParent = '',
}) {
	const { service_type = 'fcl' } = globalFilters;
	const { data, page, setPage, loading } = useListFclFreightRateStatistics({ filters: globalFilters, activeParent });
	const { total_count = 0, list = [] } = data || {};
	const { columns } = getListConfig(service_type);
	const loadingColumns = columns.map(({ accessor, ...rest }) => ({
		accessor: () => <Placeholder height="30px" width="70%" margin="16px 12px" />,
		...rest,
	}));

	return (
		<div className={cl`${styles.main_container} ${className}`}>
			{heading && <p className={styles.main_title}>{heading}</p>}
			<Table
				columns={loading ? loadingColumns : columns}
				data={loading ? [...new Array(LOADING_ROWS).keys()] : list}
				className={styles.table_container}
			/>
			<div className={styles.end_date_container} id="rnp_role">
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={pageSize}
					className={styles.pagination_container}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default SupplyRates;
