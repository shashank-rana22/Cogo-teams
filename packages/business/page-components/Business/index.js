import { Table } from '@cogoport/components';

import ListPagination from '../../common/ListPagination';
import useGetListBusinessEntities from '../../hooks/useGetListBusinessEntities';
import Header from '../Header';

import styles from './styles.module.css';

function Business() {
	const {
		list, loading, columns, data, filters, setFiters, refetch, apiTrigger,
	} = useGetListBusinessEntities();
	return (
		<div>
			<Header filters={filters} setFilters={setFiters} refetch={refetch} apiTrigger={apiTrigger} />

			<ListPagination filters={filters} setFilters={setFiters} data={data} />
			<Table
				className={styles.table}
				data={list || []}
				loading={loading}
				columns={columns}
			/>
			<ListPagination filters={filters} setFilters={setFiters} data={data} />
		</div>
	);
}

export default Business;
