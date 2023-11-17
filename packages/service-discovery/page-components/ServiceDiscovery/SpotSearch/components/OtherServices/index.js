import OTHER_SERVICES from '../../configurations/other-services';

import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

function OtherServices({
	selectedService = {},
	setSelectedService = () => {},
	setSelectedMode = () => {},
	bookable_services = {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Or, Pick from Other Services</div>

			<div className={styles.modes_container}>
				{OTHER_SERVICES.map((mode_item) => (
					<ServiceItem
						key={mode_item.value}
						data={mode_item}
						selectedService={selectedService}
						setSelectedService={setSelectedService}
						setSelectedMode={setSelectedMode}
						bookable_services={bookable_services}
					/>
				))}
			</div>
		</div>
	);
}

export default OtherServices;
