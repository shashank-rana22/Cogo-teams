import { Pagination } from '@cogoport/components';

function ListPagination({ data, stateProps }) {
	const { setFilters, filters = {} } = stateProps || {};
	const { page, total_count, page_limit } = data || {};

	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};
	return (
		<div>
			<Pagination
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={onPageChange}

			/>
		</div>
	);
}
export default ListPagination;
