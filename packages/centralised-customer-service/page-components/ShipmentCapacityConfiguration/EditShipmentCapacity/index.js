import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetCcsShipmentCapacityDetails from '../../../hooks/useGetCcsShipmentCapacityDetails';
import ShipmentCapacities from '../CreateConfiguration/components/SetConfiguration/components/ShipmentCapacities';

function EditShipmentCapacity() {
	const { list = [], loading } = useGetCcsShipmentCapacityDetails();

	const data = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		agent_experience_slab_details : agentExperienceSlabs = [],
	} = data;

	const defaultSlabUnit = agentExperienceSlabs?.[GLOBAL_CONSTANTS.zeroth_index]?.slab_unit;

	return (
		<ShipmentCapacities
			agentExperienceSlabs={agentExperienceSlabs}
			data={data}
			source="edit_capacity"
			defaultSlabUnit={defaultSlabUnit}
			loading={loading}
		/>
	);
}

export default EditShipmentCapacity;
