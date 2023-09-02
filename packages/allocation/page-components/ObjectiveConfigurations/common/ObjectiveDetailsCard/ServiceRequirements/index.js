import { useTranslation } from 'next-i18next';

import ServiceCard from './ServiceCard';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const { t } = useTranslation(['allocation']);
	const { serviceRequirementsDetails, service_requirement_operator } = props;

	return (
		<div>
			<h4 className={styles.heading}>{t('allocation:service_requirements')}</h4>

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
