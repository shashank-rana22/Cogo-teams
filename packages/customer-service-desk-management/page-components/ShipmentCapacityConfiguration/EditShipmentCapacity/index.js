import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetCsdConfigurations from '../../../hooks/useGetCsdConfigurations';
import ShipmentCapacities from '../CreateConfiguration/components/SetConfiguration/components/ShipmentCapacities';

function EditShipmentCapacity() {
	const { list = [], loading } = useGetCsdConfigurations();

	const data = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		agent_experience_slabs : agentExperienceSlabs = [], id:configId,
	} = data;

	const defaultSlabUnit = agentExperienceSlabs?.[GLOBAL_CONSTANTS.zeroth_index]?.slab_unit;

	return (
		<ShipmentCapacities
			agentExperienceSlabs={agentExperienceSlabs}
			configId={configId}
			data={data}
			source="edit_capacity"
			defaultSlabUnit={defaultSlabUnit}
			loading={loading}
		/>
	);
}

export default EditShipmentCapacity;
