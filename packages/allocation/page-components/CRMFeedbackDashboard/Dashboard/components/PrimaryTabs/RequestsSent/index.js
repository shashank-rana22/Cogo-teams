import { Pagination } from '@cogoport/components';

import CrmTable from '../../../../common/CrmTable';
import useRequestTableData from '../../../../hooks/useRequestTableData';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';

import { getRequestColumns } from './get-request-columns';
import styles from './styles.module.css';

function RequestsSent({ activeTab = '' }) {
	const {
		data = {},
		loading = false,
		router = {},
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},
	} = useRequestTableData();

	const { page, page_limit, total_count } = paginationData;

	const columns = getRequestColumns({
		router,
	});

	return (
		<div className={styles.container}>
			<Filters pageFilters={filters} onChangeFilters={onChangeFilters} activeTab={activeTab} />

			<Statistics activeTab={activeTab} />

			<CrmTable columns={columns} data={data} loading={loading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div>
		</div>
	);
}

export default RequestsSent;
