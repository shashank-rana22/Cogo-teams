import { Pagination } from '@cogoport/components';

import useFeedbackOrganization from '../../../hooks/useFeedbackOrganization';
import CrmTable from '../../commons/CrmTable';
import EnrichmentRequest from '../../EnrichmentRequest';

import styles from './styles.module.css';

function FeedbacksReceived({ organization_id = '', setActiveTab = () => {} }) {
	const {
		columns = [],
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
		checkedRowsId = [],
	} = useFeedbackOrganization({ organization_id });

	const { page, page_limit, total_count } = paginationData;

	return (
		<div className={styles.container}>
			<EnrichmentRequest checkedRowsId={checkedRowsId} setActiveTab={setActiveTab} />
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

export default FeedbacksReceived;
