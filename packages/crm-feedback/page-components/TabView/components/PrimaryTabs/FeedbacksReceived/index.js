import { Pagination } from '@cogoport/components';

import useFeedbackTableData from '../../../hooks/useFeedbackTableData';
import CrmTable from '../../commons/CrmTable';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';
import EnrichmentRequest from '../../EnrichmentRequest';

import styles from './styles.module.css';

function FeedbacksReceived({ activeTab = '' }) {
	const {
		columns = [],
		data = {},
		loading = false,
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},
	} = useFeedbackTableData();

	const { page, page_limit, total_count } = paginationData;

	return (
		<div className={styles.container}>
			<Filters pageFilters={filters} onChangeFilters={onChangeFilters} activeTab={activeTab} />
			<Statistics activeTab={activeTab} />
			<EnrichmentRequest />
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
