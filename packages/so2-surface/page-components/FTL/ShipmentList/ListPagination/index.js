import { Pagination } from '@cogoport/components';
import { useContext } from 'react';

import DashboardContext from '../../../../context/DashboardContext';

function ListPagination({ data = {} }) {
	const { setFilters, filters = {} } = useContext(DashboardContext);

	const { page, total_count, page_limit } = data || {};

	const onPageChange = (val) => {
		setFilters({ ...(filters || {}), page: val });
	};

	return (
		<Pagination
			type="table"
			currentPage={page}
			totalItems={total_count}
			pageSize={page_limit}
			onPageChange={onPageChange}
		/>

	);
}
export default ListPagination;
