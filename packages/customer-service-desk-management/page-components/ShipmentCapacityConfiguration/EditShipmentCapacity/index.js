import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetCsdConfigurations from '../../../hooks/useGetCsdConfigurations';
import ShipmentCapacities from '../CreateConfiguration/components/SetConfiguration/components/ShipmentCapacities';

function EditShipmentCapacity() {
	const { list = [], loading } = useGetCsdConfigurations();

	const data = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		agent_experience_slabs : agentExperienceSlabs = [], id:configId,
	} = data;

	return (
		<ShipmentCapacities
			agentExperienceSlabs={agentExperienceSlabs}
			configId={configId}
			data={data}
		/>
	);
}

export default EditShipmentCapacity;
