import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Headers from './Headers';
import useGetIncidentMangement from './hooks/useGetIncidentManagement';
import SelectFilter from './SelectFilters';
import styles from './styles.module.css';
import StyledTable from './Table';
import getColumns from './utils/getColumns';

function IncidentManagement() {
	const { query, push } = useRouter();
	const { activeIncidentTab } = query;
	const [activeTab, setActiveTab] = useState<string>(activeIncidentTab || 'requested');
	const [isSortActive, setIsSortActive] = useState(null);
	const { globalFilters, setGlobalFilters, data, loading, reftech } = useGetIncidentMangement({ activeTab });

	const columns = getColumns(activeTab, isSortActive, setIsSortActive, setGlobalFilters, reftech);

	const { list = [], paginationData } = data || {};
	const { pageIndex, pageSize, total } = paginationData || {};

	return (
		<div>

			<div className={styles.headerText}>
				Incident Management - My Incidents
			</div>

			<Headers activeTab={activeTab} setActiveTab={setActiveTab} data={data} push={push} />

			<SelectFilter globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} activeTab={activeTab} />
			<div className={styles.list_container}>
				<StyledTable data={list} columns={columns} loading={loading} />
			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={pageIndex}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={(val:any) => setGlobalFilters({ ...globalFilters, pageIndex: val })}
				/>
			</div>
		</div>
	);
}
export default IncidentManagement;
