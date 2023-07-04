import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';
import useGetObjectiveDetails from './useGetObjectiveDetails';

function ObjectiveDetailsCard(props) {
	const { activeObjectiveId } = props;

	const { objectiveData } = useGetObjectiveDetails({ activeObjectiveId });

	const {
		service_requirements: serviceRequirementsDetails,
		// organization_details: organizationDetails,
		// stats_details: statsDetails,
		service_requirement_operator,
	} = objectiveData;

	return (
		<section className={styles.container}>
			<ServiceRequirements
				serviceRequirementsDetails={serviceRequirementsDetails}
				operator={service_requirement_operator}
			/>
		</section>
	);
}

export default ObjectiveDetailsCard;
