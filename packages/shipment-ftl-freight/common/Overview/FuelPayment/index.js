import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import CardList from './components/CardList';
import Title from './components/Title';

function FuelPayment() {
	const { servicesList, shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div>
			<Accordion title={<Title />} animate>
				<CardList servicesList={servicesList} shipment_data={shipment_data} />
			</Accordion>
		</div>
	);
}

export default FuelPayment;
