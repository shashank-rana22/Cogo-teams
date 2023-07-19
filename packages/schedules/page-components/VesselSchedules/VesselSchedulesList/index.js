import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import CreateModal from '../CreateVesselSchedules';
import useGetVesselSchedules from '../hooks/useGetVesselSchedules';

import Filter from './Filter';
import styles from './styles.module.css';
import VesselScheduleCard from './VesselScheduleCard';

const FOUR = 4;
function VesselSchedulesList({ showModal, setShowModal }) {
	const [filters, setFilters] = useState({
		started_at       : '',
		q                : '',
		shipping_line_id : '',
		sort_by          : '',
		page             : 1,
	});
	const { data, makeRequest, loading, totalItems } = useGetVesselSchedules({ filters });

	let content = (data || [...Array(FOUR)])?.map((vessel) => (
		<VesselScheduleCard key={vessel?.id} vessel={vessel} loading={loading} />
	));

	if (!loading && !(data || []).length) {
		content = <EmptyState />;
	}
	return (
		<>
			<div>
				<Filter filter={filters} setFilter={setFilters} />
				{content}
			</div>
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
				? <CreateModal showModal={showModal} setShowModal={setShowModal} makeRequest={makeRequest} /> : null }

		</>
	);
}
export default VesselSchedulesList;
