import { isEmpty } from '@cogoport/utils';

import OrganizationDetailsCard from './OrganizationDetailsCard';
import ServiceRequirements from './ServiceRequirements';
import useGetObjectiveDetails from './useGetObjectiveDetails';

function ObjectiveDetailsCard(props) {
	const { activeObjectiveId } = props;

	const {
		data = {},
		loading: getObjectiveLoading = false,
	} = useGetObjectiveDetails({ activeObjectiveId });

	const {
		organization_details = {},
		service_details = [],
		service_requirement_operator = '',
	} = data || {};

	return (
		<>
			<ServiceRequirements
				serviceRequirementsDetails={service_details}
				getObjectiveLoading={getObjectiveLoading}
				service_requirement_operator={service_requirement_operator}
			/>

			{!isEmpty(organization_details) ? (
				<OrganizationDetailsCard organizationDetails={organization_details} />
			) : null}

		</>
	);
}

export default ObjectiveDetailsCard;
