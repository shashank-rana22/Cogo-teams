import { Pagination } from '@cogoport/components';
import { useContext } from 'react';

import DocumentDeskContext from '../../../../context/DocumentDeskContext';

function ListPagination({ data = {} }) {
	const { setFilters, filters = {} } = useContext(DocumentDeskContext);

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
