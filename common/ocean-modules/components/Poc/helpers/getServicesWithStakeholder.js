function checkForServiceOrShipment(key, stakeholderObj, stakeholder_id) {
	const { service_id, service_type } = stakeholderObj || {};

	let flag = false;

	if (key === 'service') {
		flag = service_id && service_type;
	} else {
		flag = !service_id && !service_type;
	}

	return stakeholder_id && stakeholder_id === stakeholderObj?.stakeholder_id && flag;
}

export default function getServicesWithStakeholder({
	listStakeholdersData = [],
	addPoc = {},
	servicesList = [],
}) {
	const {
		shipment_type = '',
		stakeholder_id = '',
		service_type = '',
	} = addPoc || {};

	let modifiedServicesList = [];

	if (service_type) {
		const filteredStakeholdersData = (listStakeholdersData || []).filter(
			(stakeholder) => checkForServiceOrShipment('service', stakeholder, stakeholder_id),
		);

		filteredStakeholdersData.forEach((stakeholder) => {
			(servicesList || []).some((service) => {
				const { id, shipment_type: shipmentType, ...restService } = service || {};

				if (id && id === stakeholder?.service_id) {
					modifiedServicesList.push({ ...restService, service_id: id, new_stakeholder_id: stakeholder_id });
					return true;
				}
				return false;
			});
		});
	} else if (shipment_type) {
		modifiedServicesList = (listStakeholdersData || []).filter(
			(stakeholder) => checkForServiceOrShipment('shipment', stakeholder, stakeholder_id),
		).map((stakeholder) => ({
			...stakeholder,
			new_stakeholder_id: stakeholder_id,
			shipment_type,
		}));
	}

	return { modifiedServicesList };
}
