import { Pagination } from '@cogoport/components';

const DEFAULT_PAGINATION_CONSTANT = 0;

function TablePagination({ data = {}, filters = {}, setFilters = () => {} }) {
	const { page = 0, page_limit = 10, total_count = 0 } = data;
	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Pagination
				currentPage={total_count > DEFAULT_PAGINATION_CONSTANT ? page : DEFAULT_PAGINATION_CONSTANT}
				pageSize={page_limit}
				totalItems={total_count}
				onPageChange={onPageChange}
				type="compact"
			/>
		</div>
	);
}
export default TablePagination;
