import { Pagination } from '@cogoport/components';

function HistoryPagination({ data = {}, filters = {}, setFilters = () => {} }) {
	const { page = 0, page_limit = 10, total_count = 0 } = data;
	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};
	return (
		<div>
			<Pagination
				currentPage={page}
				pageSize={page_limit}
				totalItems={total_count}
				onPageChange={onPageChange}
				type="compact"
			/>
		</div>
	);
}
export default HistoryPagination;
