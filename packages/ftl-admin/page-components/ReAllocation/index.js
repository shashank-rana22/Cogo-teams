import React, { useState } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListKamDeskSurfaceShipment from '../../hooks/useListKamDeskSurfaceShipment';

import ShipmentList from './ShipmentList';

function ReAllocation({ activeTab = 'STAKEHOLDER_RE_ALLOCATION' }) {
	const [selectedShipments, setSelectedShipments] = useState(new Set());
	const { data, loading, filters, setFilters } = useListKamDeskSurfaceShipment({ activeTab });
	return (
		<div>
			<SearchShipment
				keyName="serial_id"
				isMultiSelect={false}
				lowerLabel=""
				placeholder="Search SID"
				upperLabel="Serach SID"
				setFilters={setFilters}
			/>
			{loading ? <Loader /> : (
				<ShipmentList
					data={data}
					filters={filters}
					selectedShipments={selectedShipments}
					setSelectedShipments={setSelectedShipments}
					setFilters={setFilters}
				/>
			)}
		</div>
	);
}

export default ReAllocation;
