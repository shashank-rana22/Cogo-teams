import { Table, Pagination } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useListOrganizationTradePartyDetails from '../../../hooks/useListOrganizationTradePartyDetails';

import styles from './styles.module.css';
import tableColumns from './tableColumns';

const ZERO = 0;

function ListView({
	typeOfSearch,
	globalSearch,
	page,
	filterParams,
	setPage,
}) {
	const [tableData, setTableData] = useState([]);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(globalSearch);
	}, [globalSearch, debounceQuery]);
	const setSearchFilters = () => {
		if (!globalSearch) return null;

		if (typeOfSearch === 'trade_party') {
			return {
				q: query,
			};
		}

		return {
			sage_organization_id: query,
		};
	};
	const searchParams = setSearchFilters();
	const { data, loading } = useListOrganizationTradePartyDetails({ page, filterParams, searchParams });

	useEffect(() => {
		setTableData(data?.list);
	}, [data]);

	if (loading) return <div>Loading....</div>;

	if (data?.total_count === ZERO) {
		return <div className={styles.center}><h2>No Results found !!</h2></div>;
	}
	return (
		<div>
			<Pagination
				type="table"
				currentPage={page}
				onPageChange={setPage}
				totalItems={data?.total_count}
				pageSize={data?.page_limit}
				className={styles.page}
			/>
			<Table columns={tableColumns} data={tableData} className={styles.table} />
			<Pagination
				className={styles.page}
				type="table"
				currentPage={page}
				onPageChange={(value) => setPage(value)}
				totalItems={data?.total_count}
				pageSize={data?.page_limit}
			/>
		</div>
	);
}

export default ListView;
