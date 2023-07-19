import ServiceCard from './ServiceCard';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const { serviceRequirementsDetails, service_requirement_operator } = props;

	return (
		<div>
			<h4 className={styles.heading}>Serivce Requirements</h4>

			<div className={styles.card_list}>
				{serviceRequirementsDetails.map((item, index) => (
					<ServiceCard
						key={item.name}
						index={index}
						item={item}
						service_requirement_operator={service_requirement_operator}
					/>
				))}
			</div>
		</div>
	);
}

export default ServiceRequirements;
