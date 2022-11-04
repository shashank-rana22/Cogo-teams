import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function ShipmentDetails() {
	const partnerId = useSelector((state) => state.partnerIdStore.partnerId);

	const { query } = useRouter();

	return (
		<div>

			<div>
				Shipment Detail id =
				{query.id}
			</div>
			<div>
				{' '}
				Current partnerId =
				{partnerId}
			</div>

		</div>
	);
}

export default ShipmentDetails;
