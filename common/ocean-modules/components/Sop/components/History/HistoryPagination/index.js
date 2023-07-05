import { Pagination } from '@cogoport/components';

const TOTAL_COUNT_GREATER_THAN = 0;

const DEFAULT_CURRENT_PAGE = 0;

function HistoryPagination({ data = {}, filters = {}, setFilters = () => {} }) {
	const { page = 0, page_limit = 10, total_count = 0 } = data;

	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Pagination
				currentPage={total_count > TOTAL_COUNT_GREATER_THAN ? page : DEFAULT_CURRENT_PAGE}
				pageSize={page_limit}
				totalItems={total_count}
				onPageChange={onPageChange}
				type="compact"
			/>
		</div>
	);
}
export default HistoryPagination;
