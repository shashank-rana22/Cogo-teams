import React from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListKamDeskSurfaceShipment from '../../hooks/useListKamDeskSurfaceShipment';

import ShipmentList from './ShipmentList';

function EditSellQuotation({ activeTab = '' }) {
	const { data, loading, filters, setFilters } = useListKamDeskSurfaceShipment();

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
			{loading ? <Loader />
				: (
					<ShipmentList
						data={data}
						loading={loading}
						activeTab={activeTab}
						filters={filters}
						setFilters={setFilters}
					/>
				)}

		</div>
	);
}

export default EditSellQuotation;
