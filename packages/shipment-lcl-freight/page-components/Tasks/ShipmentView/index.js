import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useEffect } from 'react';

import useListShipments from '../../../hooks/useListShipments';

import Details from './Details';

function ShipmentView() {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	const { data, setFilters, loading } = useListShipments({
		defaultFilters: {
			parent_shipment_id: shipment_data.id,
		},
	});

	useEffect(() => {
		setFilters({ parent_shipment_id: shipment_data.id });
	}, [shipment_data, setFilters]);

	return loading ? <Loader /> : data?.list?.map((i) => <Details key={i?.id} shipment_details={i} />);
}

export default ShipmentView;
