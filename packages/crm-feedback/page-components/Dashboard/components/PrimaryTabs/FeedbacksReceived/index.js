import { Pagination } from '@cogoport/components';

import useFeedbackTableData from '../../../hooks/useFeedbackTableData';
import CrmTable from '../../commons/CrmTable';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';
import EnrichmentRequest from '../../EnrichmentRequest';

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
	} = useFeedbackTableData();

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
