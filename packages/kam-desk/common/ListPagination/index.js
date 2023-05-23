import { Pagination } from '@cogoport/components';
import { useContext } from 'react';

import KamDeskContext from '../../context/KamDeskContext';

function ListPagination({ data = {} }) {
	const { filters, setFilters } = useContext(KamDeskContext);
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
