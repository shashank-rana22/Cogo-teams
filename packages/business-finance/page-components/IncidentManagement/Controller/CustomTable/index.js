import { Pagination } from '@cogoport/components';
import React from 'react';

import ColumnCard from './ColumnCard';
import { CONTROLLER_CONFIG } from './Config/controller-config';
import Header from './Header';
import styles from './styles.module.css';

const DEFAULT_LOADER_LEN = 6;
const FILL = 1;

function CustomTable({
	incidentData = {},
	incidentLoading = false,
	getIncidentLevels = () => { },
	setFilters = () => { },
	filters = {},
}) {
	const { list, paginationData } = incidentData || {};
	const { total, pageSize, pageIndex } = paginationData || {};
	return (
		<div>
			<Header config={CONTROLLER_CONFIG} />
			{(list || Array(DEFAULT_LOADER_LEN).fill(FILL)).map((item) => (
				<ColumnCard
					key={item?.id}
					config={CONTROLLER_CONFIG}
					item={item}
					incidentLoading={incidentLoading}
					refetch={getIncidentLevels}
				/>
			))}
			<div className={styles.pagination_container}>
				{incidentLoading ? null : (
					<Pagination
						type="table"
						currentPage={pageIndex}
						totalItems={total}
						pageSize={pageSize}
						onPageChange={(val) => { setFilters({ ...filters, pageIndex: val }); }}
					/>
				)}
			</div>
		</div>
	);
}

export default CustomTable;
