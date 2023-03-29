import { Pagination } from '@cogoport/components';

import CrmTable from '../../../../common/CrmTable';
import EnrichmentRequest from '../../../../common/EnrichmentRequest';
import useFeedbackTableData from '../../../../hooks/useFeedbackTableData';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';

import { FEEDBACK_COLUMNS } from './get-feedback-columns';
import styles from './styles.module.css';

function FeedbacksReceived({ activeTab = '', setActiveTab = () => {} }) {
	const {
		data = {},
		loading = false,
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
		selectedBulkData = [],
		onBulkDataPayload = () => {},
	} = useFeedbackTableData({});

	const { page, page_limit, total_count } = paginationData;

	const columns = FEEDBACK_COLUMNS({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
	});

	return (
		<div className={styles.container}>
			<Filters pageFilters={filters} onChangeFilters={onChangeFilters} activeTab={activeTab} />

			<Statistics activeTab={activeTab} />

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
