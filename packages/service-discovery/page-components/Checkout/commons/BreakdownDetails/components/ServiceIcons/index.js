import { cl } from '@cogoport/components';

import getIconMapping from './getIconMapping';
import ServiceIcon from './ServiceIcon';
import styles from './styles.module.css';

const classNameSelector = ({ service = {}, selectedServices = [] }) => {
	const { iconName = '', type = '' } = service;

	if (selectedServices.includes(iconName) && type === 'icon') {
		return 'additional-services-logo';
	}

	if (type === 'text') {
		return 'circle';
	}

	return 'temp';
};

function ServiceIcons({
	detailedServices = {},
	primaryService = {},
	primary_service = '',
	source = '',
}) {
	const { selectedServices, iconMapping } = getIconMapping({
		primaryService,
		detailedServices,
		primary_service,
	});

	if (!['fcl_freight', 'air_freight'].includes(primary_service)) {
		return null;
	}

	return (
		<div className={cl`${styles.container} ${styles[source]}`}>
			<div className={styles.service_logo}>
				{iconMapping?.map((service) => (
					<div
						key={service}
						className={cl`${styles.service_icon_container} ${
							styles[classNameSelector({ service, selectedServices })]
						}`}
					>
						<ServiceIcon
							service={service}
							selectedServices={selectedServices}
						/>
					</div>
				))}
			</div>

			<div className={styles.line} />
		</div>
	);
}

export default ServiceIcons;
