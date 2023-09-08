import { Table } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useEffect } from 'react';

import useListOrganizationTradePartyDetails from '../../../hooks/useListOrganizationTradePartyDetails';

import ListPagination from './ListPagination';
import styles from './styles.module.css';
import tableColumns from './tableColumns';

function ListView({
	typeOfSearch = '',
	globalSearch = '',
	filterParams = {},
	setFilterParams = () => {},
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
		if (typeOfSearch === 'serial_id') {
			return {
				serial_id: query,
			};
		}
		return {
			sage_organization_id: query,
		};
	};

	const searchParams = setSearchFilters();
	const { data, loading } = useListOrganizationTradePartyDetails({ filterParams, searchParams });

	return (
		<div>
			<ListPagination data={data} filterParams={filterParams} setFilterParams={setFilterParams} />

			<Table columns={tableColumns} data={data?.list || []} className={styles.table} loading={loading} />

			<ListPagination data={data} filterParams={filterParams} setFilterParams={setFilterParams} />
		</div>
	);
}

export default ListView;
