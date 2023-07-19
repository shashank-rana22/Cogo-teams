const getSourceOrganizationData = ({ lead_organization = {}, organization = {} }) => {
	if (!lead_organization) {
		return organization;
	}

	return lead_organization;
};

export default getSourceOrganizationData;
