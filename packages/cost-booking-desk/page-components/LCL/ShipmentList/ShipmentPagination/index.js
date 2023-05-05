import { Pagination } from '@cogoport/components';
import { useContext } from 'react';

import CostBookingDeskContext from '../../../../context/CostBookingDeskContext';

function ShipmentPagination({ data = {} }) {
	const { page, total_count, page_limit } = data || {};
	const { setFilters = () => {}, filters = {} } = useContext(CostBookingDeskContext);

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
export default ShipmentPagination;
