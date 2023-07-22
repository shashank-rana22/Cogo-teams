import { Table, Pagination, Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import useListCogooneFlashRatesLogs from '../../../../../hooks/useListCogooneFlashRatesLogs';

import getLogsColumns from './getLogsColumns';
import Header from './Header';
import styles from './styles.module.css';

const NO_OF_ROWS_TO_BE_LOADED = 10;

function LogsTable() {
	const [sidQuery, setSidQuery] = useState('');
	const [filtersParams, setFilterParams] = useState({ service_type: '', flashed_at: null });

	const {
		logsLoading,
		logsData,
		getFlashRateLogs,
		sQuery,
	} = useListCogooneFlashRatesLogs({ filtersParams, sidQuery });

	const {
		list = [],
		page = 1,
		total_count = 0,
		page_limit = 10,
		reverted_shipments = [],
	} = logsData || {};

	const logColumns = getLogsColumns({ setFilterParams, filtersParams, reverted_shipments });

	return (
		<div className={styles.container}>
			<Header
				setSidQuery={setSidQuery}
				sidQuery={sidQuery}
				filtersParams={filtersParams}
				setFilterParams={setFilterParams}
			/>

			<Table
				columns={logColumns}
				data={list}
				layoutType="table"
				loading={logsLoading}
				loadingRowsCount={NO_OF_ROWS_TO_BE_LOADED}
			/>

			<div className={styles.pagination_container}>
				{logsLoading
					? <Placeholder height="20px" width="250px" /> : (
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={(nextPage) => getFlashRateLogs({
								filters : filtersParams,
								query   : sQuery,
								page    : nextPage,
							})}
						/>
					)}
			</div>

		</div>
	);
}

export default LogsTable;
