export default function getServicesWithStakeholder({ servicesList, stakeholder_type = '', stakeholder_id = '' }) {
	const stakeholderTaggedInServices = (servicesList || []).filter(
		(service) => stakeholder_id
        && service?.[stakeholder_type]?.id === stakeholder_id,
	);

	return { stakeholderTaggedInServices };
}
