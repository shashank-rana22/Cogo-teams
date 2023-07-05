import ServiceCard from './ServiceCard';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const { serviceRequirementsDetails, operator } = props;

	return (
		<div>
			<h4 className={styles.heading}>Serivce Requirements</h4>

			<div className={styles.card_list}>
				{serviceRequirementsDetails.map((item, index) => (
					<ServiceCard
						key={item.id}
						index={index}
						item={item}
						operator={operator}
					/>
				))}
			</div>
		</div>
	);
}

export default ServiceRequirements;
