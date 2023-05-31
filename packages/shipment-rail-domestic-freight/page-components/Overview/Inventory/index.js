import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetRailShipmentContainerDetail from '../../../hooks/useGetRailShipmentContainerDetail';
import useUpdateRailShipmentContainerDetails from '../../../hooks/useUpdateRailShipmentContainerDetails';

const Inventory = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { data, loading } = useGetRailShipmentContainerDetail({
		defaultParams: {
			shipment_id: shipment_data?.id,
		},
	});

	const {
		apiTrigger:updateContainerDetails = () => {},
		loading:updateLoading,
	} = useUpdateRailShipmentContainerDetails({});
};

export default Inventory;
