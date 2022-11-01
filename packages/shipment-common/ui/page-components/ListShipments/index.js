import { FluidContainer } from '@cogoport/components';
import { useRouter } from 'next/router';
import React from 'react';

function ListRates() {
	const { push } = useRouter();

	const service = 'fcl-freight';
	// const portService = service.toUpperCase().replace('-', '_');

	const handleGetShipment = () => {
		push(`${process.env.URL_SHIPMENT_FCL_FREIGHT}/shipment/${service}`);
	};

	return (
		<FluidContainer>
			<p>
				List Shipment Page goes here
				This is a common repo for shipment
			</p>
			<button onClick={handleGetShipment}>go to shipment details page</button>
		</FluidContainer>
	);
}

export default ListRates;
