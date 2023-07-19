import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import CreateModal from '../CreateSailingSchedule';
import useListSailingSchedules from '../hooks/useListSailingSchedules';

import Filter from './Filter';
import SailingScheduleCard from './SailingScheduleCard';
import styles from './styles.module.css';

const FOUR = 4;
function SailingScheduleList({ showModal = false, setShowModal = () => {} }) {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { data, totalItems, loading, listSailingSchedules } = useListSailingSchedules({ filters });

	let content = (data || [...Array(FOUR)]).map((sailingSchedule) => (
		<SailingScheduleCard key={sailingSchedule?.id} sailingSchedule={sailingSchedule} loading={loading} />
	));

	if (!loading && !(data || []).length) {
		content = <EmptyState height={300} />;
	}
	return (
		<>
			<Filter filters={filters} setFilters={setFilters} />
			{content}
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
