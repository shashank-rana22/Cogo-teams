import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import CreateModal from '../CreateSailingSchedule';
import useListSailingSchedules from '../hooks/useListSailingSchedules';

import Filter from './Filter';
import SailingScheduleCard from './SailingScheduleCard';
import styles from './styles.module.css';

function SailingScheduleList({ showModal, setShowModal }) {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { data, totalItems, loading, listSailingSchedules } = useListSailingSchedules({ filters });
	return (
		<>
			<Filter filters={filters} setFilters={setFilters} />
			{(data || [1, 2, 3, 4]).map((sailingSchedule) => (
				<SailingScheduleCard key={sailingSchedule?.id} sailingSchedule={sailingSchedule} loading={loading} />
			))}
			<div className={styles.pagination}>
				<Pagination
					className="md"
					type="table"
					currentPage={filters.page}
					totalItems={totalItems}
					pageSize={10}
					onPageChange={(val) => setFilters({ ...filters, page: val })}
				/>
			</div>
			{ showModal
				? (
					<CreateModal
						showModal={showModal}
						setShowModal={setShowModal}
						refetch={listSailingSchedules}
					/>
				) : null }
		</>
	);
}

export default SailingScheduleList;
