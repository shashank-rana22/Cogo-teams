import { Pagination } from '@cogoport/components';

import useRequestOrganization from '../../../hooks/useRequestOrganization';
import CrmTable from '../../commons/CrmTable';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';

import styles from './styles.module.css';

function RequestsSent({ activeTab = '' }) {
	const {
		columns = [],
		data = {},
		loading = false,
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},
	} = useRequestOrganization();

	const { page, page_limit, total_count } = paginationData;

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
