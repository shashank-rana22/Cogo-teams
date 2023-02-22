import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import EmptyState from './common/EmptyState';
import Headers from './Headers';
import useGetIncidentMangement from './hooks/useGetIncidentManagement';
import SelectFilter from './SelectFilters';
import styles from './styles.module.css';
import StyledTable from './Table';
import { COLUMNS_MAPPING } from './utils/getColumns';

function MyIncident() {
	const { query, push } = useRouter();
	const { activeIncidentTab } = query;
	const [activeTab, setActiveTab] = useState<string>(activeIncidentTab || 'requested');
	const [payload, setPayload] = useState(null);
	const [isSortActive, setIsSortActive] = useState(null);

	const { globalFilters, setGlobalFilters, data, loading, refetch } = useGetIncidentMangement({
		activeTab,
		payload,
	});

	const { list = [], paginationData } = data || {};
	const { pageIndex, pageSize, total } = paginationData || {};

	useEffect(() => {
		setPayload(null);
	}, [activeTab]);

	const columns = COLUMNS_MAPPING(
		{
			setActiveTab,
			isSortActive,
			setIsSortActive,
			setGlobalFilters,
			refetch,
			setPayload,
		},
	)[activeTab];

	return (
		<div>

			<div className={styles.header_text}>
				My Incidents
			</div>

			<Headers
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				data={data}
				push={push}
			/>

			<SelectFilter globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} activeTab={activeTab} />

			<div className={styles.list_container}>
				{list.length > 0
					? <StyledTable data={list} columns={columns} loading={loading} />
					: <EmptyState />}
			</div>
			{list.length > 0
			&& (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={pageIndex}
						totalItems={total}
						pageSize={pageSize}
						onPageChange={(val) => setGlobalFilters({ ...globalFilters, pageIndex: val })}
					/>
				</div>
			)}
		</div>
	);
}
export default MyIncident;
