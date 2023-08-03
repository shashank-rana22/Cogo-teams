import { Toggle } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useListShipment from '../hooks/useListShipment';

import Body from './Body';
import Header from './Header';

function ShipmentSurface() {
	const router = useRouter();
	const [serviceActiveTab, setServiceActiveTab] = useState('ftl_freight');
	const [shipmentStateTab, setShipmentStateTab] = useState('ongoing');

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const {
		data, filters, setFilters, loading, setPage,
	} =	 useListShipment({ serviceActiveTab, shipmentStateTab, searchQuery });

	const handleOnchange = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipment-management`;
		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '15px' }}>
				<h1>
					Surface Bookings Desk
				</h1>
				<Toggle
					offLabel="New"
					onLabel="Old"
					size="md"
					onChange={() => handleOnchange()}
					showOnOff
				/>
			</div>
			<Header
				serviceActiveTab={serviceActiveTab}
				setServiceActiveTab={setServiceActiveTab}
				shipmentStateTab={shipmentStateTab}
				setShipmentStateTab={setShipmentStateTab}
				debounceQuery={debounceQuery}
				setFilters={setFilters}
				filters={filters}
			/>

			<Body data={data} loading={loading} setPage={setPage} />
		</div>
	);
}

export default ShipmentSurface;
