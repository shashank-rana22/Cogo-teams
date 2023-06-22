import React from 'react';

import OTHER_SERVICES from '../../configurations/other-services';

import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

function OtherServices({
	selectedService = '',
	setSelectedService = () => {},
	setSelectedMode = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Or, Pick from Other Services</div>

			<div className={styles.modes_container}>
				{OTHER_SERVICES.map((mode_item) => (
					<ServiceItem
						data={mode_item}
						key={mode_item.value}
						selectedService={selectedService}
						setSelectedService={setSelectedService}
						setSelectedMode={setSelectedMode}
					/>
				))}
			</div>
		</div>
	);
}

export default OtherServices;
