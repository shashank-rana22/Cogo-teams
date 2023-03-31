import { Pagination } from '@cogoport/components';

import CrmTable from '../../../../common/CrmTable';
import useRequestOrganization from '../../../../hooks/useRequestOrganization';

import { getRequestColumns } from './get-request-columns';
import styles from './styles.module.css';

function RequestTab({ organization_id = '', type = '' }) {
	const {
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
		refetch = () => {},
	} = useRequestOrganization({ organizationId: organization_id, type });

	const { page, page_limit, total_count } = paginationData;

	const columns = getRequestColumns({ refetch });

	return (
		<div className={styles.container}>
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

export default RequestTab;
