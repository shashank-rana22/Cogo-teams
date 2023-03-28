import { Pagination } from '@cogoport/components';

import useFeedbackTableData from '../../../../hooks/useFeedbackTableData';
import CrmTable from '../../commons/CrmTable';
import EnrichmentRequest from '../../EnrichmentRequest';

import { FEEDBACK_COLUMNS } from './get-feedback-columns';
import styles from './styles.module.css';

function FeedbacksReceived({ organization_id = '', setActiveTab = () => {} }) {
	const {
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
		selectedBulkData = [],
		onBulkDataPayload = () => {},
	} = useFeedbackTableData({ organizationId: organization_id });

	const { page, page_limit, total_count } = paginationData;

	const columns = FEEDBACK_COLUMNS({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
	});

	return (
		<div className={styles.container}>
			<EnrichmentRequest
				checkedRowsId={checkedRowsId}
				setActiveTab={setActiveTab}
				selectedBulkData={selectedBulkData}
				onBulkDataPayload={onBulkDataPayload}
			/>

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
