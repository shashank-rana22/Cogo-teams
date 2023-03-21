import { Pagination } from '@cogoport/components';

import useRequestOrganization from '../../../hooks/useRequestOrganization';
import CrmTable from '../../commons/CrmTable';
import EditEnrichment from '../../EditEnrichment';

import { REQUEST_COLUMNS } from './get-request-columns';
import styles from './styles.module.css';

function RequestTab(organization_id = '') {
	const {
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
		checkedRow = '',
		onChangeBodyCheckbox = () => {},
	} = useRequestOrganization({ organization_id });

	const { page, page_limit, total_count } = paginationData;

	const columns = REQUEST_COLUMNS({
		checkedRow,
		onChangeBodyCheckbox,
	});

	return (
		<div className={styles.container}>
			<EditEnrichment checkedRow={checkedRow} />
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
