import { Placeholder } from '@cogoport/components';

import ServiceCard from './ServiceCard';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const {
		serviceRequirementsDetails = [],
		getObjectiveLoading = false,
		service_requirement_operator = '',
	} = props;

	if (getObjectiveLoading) {
		return (
			<div className={styles.container}>
				<Placeholder height="150px" width="600px" margin="20px 0px 20px 0px" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h4 className={styles.heading}>Serivce Requirements</h4>

			<div className={styles.card_list}>

				{(serviceRequirementsDetails || []).map((item, index) => {
					if (!item?.service_type) {
						return null;
					}
					return (
						<ServiceCard
							key={item.id}
							index={index}
							item={item}
							operator={service_requirement_operator}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default ServiceRequirements;
