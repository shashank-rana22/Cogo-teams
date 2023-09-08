import { Table } from '@cogoport/components';

import ListPagination from './ListPagination';
import styles from './styles.module.css';
import tableColumns from './tableColumns';

function ListView({ data = {}, loading = false, filterParams = {}, setFilterParams = () => {} }) {
	const paginationProps = { data, filterParams, setFilterParams };
	return (
		<div>
			<ListPagination paginationProps={paginationProps} />

			<Table columns={tableColumns} data={data?.list || []} className={styles.table} loading={loading} />

			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}

export default ListView;
