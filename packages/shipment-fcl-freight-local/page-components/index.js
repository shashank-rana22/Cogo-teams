import { ShipmentDetailContext } from '@cogoport/context';
import ShipmentPageContainer from '@cogoport/ocean-modules/components/ShipmentPageContainer';
import { useMemo } from 'react';

import useGetActiveStakeholder from '../hooks/useGetActiveStakeholder';
import useGetServices from '../hooks/useGetServices';
import useGetShipment from '../hooks/useGetShipment';
import useGetTimeline from '../hooks/useGetTimeline';
import getStakeholderConfig from '../stakeholderConfig';

import DefaultView from './DefaultView';

const SERVICE_ADDITIONAL_METHODS = ['stakeholder', 'service_objects', 'booking_requirement'];
const SHIPMENT_ADDITIONAL_METHODS = ['main_service', 'documents'];

function FclFreightLocal() {
	const { get } = useGetShipment({ additional_methods: SHIPMENT_ADDITIONAL_METHODS });

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};

	const { servicesGet = {} } = useGetServices({
		shipment_data,
		additional_methods: SERVICE_ADDITIONAL_METHODS,
	});

	const { getTimeline = {} } = useGetTimeline({ shipment_data });

	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });

	const contextValues = useMemo(() => ({
		...get,
		...servicesGet,
		...getTimeline,
		activeStakeholder,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, activeStakeholder, stakeholderConfig]);

	return (
		<ShipmentPageContainer
			isGettingShipment={isGettingShipment}
			shipmentStatusCode={getShipmentStatusCode}
			shipmentData={shipment_data}
		>
			<ShipmentDetailContext.Provider value={contextValues}>
				<DefaultView />
			</ShipmentDetailContext.Provider>
		</ShipmentPageContainer>
	);
}

export default FclFreightLocal;
