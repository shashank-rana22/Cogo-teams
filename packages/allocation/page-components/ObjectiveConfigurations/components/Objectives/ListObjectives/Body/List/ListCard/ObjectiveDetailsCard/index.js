import { isEmpty } from '@cogoport/utils';

import OrganizationDetailsCard from './OrganizationDetailsCard';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';
import TransactionFunnelCard from './TransactionFunnelCard';
import useGetObjectiveDetails from './useGetObjectiveDetails';

function ObjectiveDetailsCard(props) {
	const { activeObjectiveId } = props;

	const { objectiveData } = useGetObjectiveDetails({ activeObjectiveId });

	const {
		service_requirements: serviceRequirementsDetails,
		organization_details: organizationDetails,
		stats_details: statsDetails,
		service_requirement_operator,
	} = objectiveData;

	return (
		<section className={styles.container}>
			<ServiceRequirements
				serviceRequirementsDetails={serviceRequirementsDetails}
				operator={service_requirement_operator}
			/>

			{!isEmpty(organizationDetails) && <OrganizationDetailsCard organizationDetails={organizationDetails} />}

			{!isEmpty(statsDetails) && <TransactionFunnelCard statsDetails={statsDetails} />}
		</section>
	);
}

export default ObjectiveDetailsCard;
