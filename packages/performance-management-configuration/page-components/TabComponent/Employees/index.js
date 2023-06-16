import { Input, Pagination } from '@cogoport/components';

import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';
import useEmployeeDetails from './useEmployeeDetails';

const DEFAULT_TOTAL_COUNT = 10;
const EMPTY_TEXT_DEFAULT = 'No employees found';

function Employees() {
	const {
		search, setSearch, page, setPage,
		data, loading, columns,
	} = useEmployeeDetails();

	const { list, ...paginationData } = data || {};

	const { page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<div>
			<div className={styles.input_container}>
				<Input size="md" placeholder="Search" value={search} onChange={setSearch} />
			</div>

			<StyledTable columns={columns} data={list} loading={loading} emptyText={EMPTY_TEXT_DEFAULT} />

			{paginationData?.total_count > DEFAULT_TOTAL_COUNT ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						totalItems={total_count}
						currentPage={page}
						pageSize={page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Employees;
