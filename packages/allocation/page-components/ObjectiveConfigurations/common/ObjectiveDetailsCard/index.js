import { isEmpty } from '@cogoport/utils';

import OrganizationDetailsCard from './OrganizationDetailsCard';
import ServiceRequirements from './ServiceRequirements';
import TransactionFunnelCard from './TransactionFunnelCard';

function ObjectiveDetailsCard(props) {
	const { objectiveData } = props;

	const {
		service_requirements: serviceRequirementsDetails = [],
		organization_details: organizationDetails = {},
		stats_details: statsDetails = {},
		service_requirement_operator = '',
	} = objectiveData || {};

	return (
		<>
			{serviceRequirementsDetails.some((item) => Object.values(item).some(
				(singleItem) => !isEmpty(singleItem),
			)) && (
				<ServiceRequirements
					serviceRequirementsDetails={serviceRequirementsDetails}
					service_requirement_operator={service_requirement_operator}
				/>
			)}

			{Object.values(organizationDetails).some((item) => !isEmpty(item))
			&& <OrganizationDetailsCard organizationDetails={organizationDetails} />}

			{Object.values(statsDetails).some((item) => !isEmpty(item))
			&& <TransactionFunnelCard statsDetails={statsDetails} />}
		</>
	);
}

export default ObjectiveDetailsCard;
