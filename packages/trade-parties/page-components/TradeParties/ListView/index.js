import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';

import ListPagination from './ListPagination';
import styles from './styles.module.css';
import tableColumns from './tableColumns';

function ListView({ data = {}, loading = false, filterParams = {}, setFilterParams = () => {} }) {
	const paginationProps = { data, filterParams, setFilterParams };
	if (isEmpty(data?.list)) {
		return <EmptyState />;
	}
	return (
		<div>
			<ListPagination paginationProps={paginationProps} />

			<Table columns={tableColumns} data={data?.list || []} className={styles.table} loading={loading} />

			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}

export default ListView;
