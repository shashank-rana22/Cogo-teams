import { isEmpty } from '@cogoport/utils';

const getSourceOrganizationData = ({ lead_organization = {}, organization = {} }) => {
	if (isEmpty(lead_organization)) {
		return organization;
	}
	return lead_organization;
};

export default getSourceOrganizationData;
