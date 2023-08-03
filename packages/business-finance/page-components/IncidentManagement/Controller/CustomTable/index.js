import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../common/EmptyState/index.tsx';

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
			{!isEmpty(list) ? <Header config={CONTROLLER_CONFIG} /> : null}
			{!isEmpty(list) || incidentLoading ? (
				<>
					{(!isEmpty(list) ? list : Array(DEFAULT_LOADER_LEN).fill(FILL)).map((item) => (
						<ColumnCard
							key={item?.id}
							config={CONTROLLER_CONFIG}
							item={item}
							incidentLoading={incidentLoading}
							refetch={getIncidentLevels}
						/>
					))}
				</>
			) : <EmptyState />}
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
