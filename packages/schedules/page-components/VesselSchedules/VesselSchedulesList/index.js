import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import CreateModal from '../CreateVesselSchedules';
import useGetVesselSchedules from '../hooks/useGetVesselSchedules';

import Filter from './Filter';
import styles from './styles.module.css';
import VesselScheduleCard from './VesselScheduleCard';

function VesselSchedulesList({ showModal, setShowModal }) {
	const [filters, setFilters] = useState({});
	const { data, makeRequest, loading, totalItems } = useGetVesselSchedules({ filters });
	return (
		<>
			<div>
				<Filter filter={filters} setFilter={setFilters} />
				{data
            && data?.map((vessel) => (
	<VesselScheduleCard key={vessel?.id} vessel={vessel} loading={loading} />
            ))}
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
