export default function getServicesWithStakeholder({
	servicesList,
	stakeholder_type = '',
	stakeholder_id = '',
	service_type = '',
	shipment_type = '',
}) {
	let stakeholderTaggedInServices = [];

	if (service_type) {
		stakeholderTaggedInServices = (servicesList || []).filter(
			(service) => stakeholder_id
			&& service?.[stakeholder_type]?.id === stakeholder_id,
		);
	} else if (shipment_type) {
		stakeholderTaggedInServices = [{
			stakeholder_id,
			[stakeholder_type]: {
				id: stakeholder_id,
			},
			shipment_type,
		}];
	}

	return { stakeholderTaggedInServices };
}
