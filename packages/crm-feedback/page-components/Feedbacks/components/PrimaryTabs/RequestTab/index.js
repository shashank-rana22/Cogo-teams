import { Pagination } from '@cogoport/components';

// import useRequestOrganization from '../../../hooks/useRequestOrganization';
import CrmTable from '../../commons/CrmTable';

import styles from './styles.module.css';

function RequestTab() {
	// const {
	// 	columns = [],
	// 	data = {},
	// 	loading = false,
	// 	onChangeParams = () => {},
	// 	paginationData = {},
	// } = useRequestOrganization();

	// const { page, page_limit, total_count } = paginationData;

	return (
		<div className={styles.container}>

			{/* <CrmTable columns={columns} data={data} loading={loading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div> */}
		</div>
	);
}

export default RequestTab;
