import { useState } from 'react';

import useGetShipment from '../../../../hooks/useGetShipment';
import useListShipmentServices from '../../../../hooks/useListShipmentServices';

function Details({ shipment_details = {} }) {
	const [show, setShow] = useState(false);

	const { servicesList, refetchServices } = useListShipmentServices({});

	const { refetch, data } = useGetShipment({ defaultParams: { id: shipment_details.id } });

	return <div>Details</div>;
}

export default Details;
