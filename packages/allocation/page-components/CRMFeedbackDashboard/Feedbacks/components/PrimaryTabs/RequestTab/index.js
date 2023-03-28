import { Pagination } from '@cogoport/components';

import useRequestOrganization from '../../../hooks/useRequestOrganization';
import CrmTable from '../../commons/CrmTable';

import { REQUEST_COLUMNS } from './get-request-columns';
import styles from './styles.module.css';

function RequestTab({ organization_id = '', type = '' }) {
	const {
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
	} = useRequestOrganization({ organizationId: organization_id, type });

	const { page, page_limit, total_count } = paginationData;

	const columns = REQUEST_COLUMNS;

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
