import { Table, Pagination } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useEffect } from 'react';

import useListOrganizationTradePartyDetails from '../../../hooks/useListOrganizationTradePartyDetails';

import styles from './styles.module.css';
import tableColumns from './tableColumns';

function ListView({
	typeOfSearch,
	globalSearch,
	page,
	filterParams,
	setPage,
}) {
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

			<Table columns={tableColumns} data={data?.list || []} className={styles.table} loading={loading} />

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
