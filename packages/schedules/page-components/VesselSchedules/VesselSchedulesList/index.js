import { useState } from 'react';

import CreateModal from '../CreateVesselSchedules';
import useGetVesselSchedules from '../hooks/useGetVesselSchedules';

import Filter from './Filter';
import VesselScheduleCard from './VesselScheduleCard';

function VesselSchedulesList({ showModal, setShowModal }) {
	const [filter, setFilter] = useState({});
	const { data, makeRequest } = useGetVesselSchedules({ filter });
	return (
		<>
			<div>
				<Filter filter={filter} setFilter={setFilter} />
				{data
            && data?.map((vessel) => (
	            <VesselScheduleCard vessel={vessel} />
            ))}
			</div>
			{ showModal
				? <CreateModal showModal={showModal} setShowModal={setShowModal} makeRequest={makeRequest} /> : null }

		</>
	);
}
export default VesselSchedulesList;
