import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useListSailingSchedules from '../hooks/useListSailingSchedules';

import Filter from './Filter';
import SailingScheduleCard from './SailingScheduleCard';

function SailingScheduleList() {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { data, totalItems } = useListSailingSchedules({ filters });
	return (
		<>
			<Filter filters={filters} setFilters={setFilters} />
			{(data || []).map((sailingSchedule) => (
				<SailingScheduleCard key={sailingSchedule?.id} sailingSchedule={sailingSchedule} />
			))}
			<div>
				<Pagination
					className="md"
					type="table"
					currentPage={filters.page}
					totalItems={totalItems}
					pageSize={10}
					onPageChange={(val) => setFilters({ ...filters, page: val })}
				/>
			</div>
		</>
	);
}

export default SailingScheduleList;
