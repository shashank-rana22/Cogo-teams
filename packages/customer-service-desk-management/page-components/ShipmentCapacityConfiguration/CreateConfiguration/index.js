import { Stepper } from '@cogoport/components';
import React, { useState } from 'react';

import useCreateCsdConfig from '../../../hooks/useCreateCsdConfig';

import SelectUsers from './components/SelectUsers';
import SetConfiguration from './components/SetConfiguration';
import TotalShipmentCapacity from './components/TotalShipmentCapacity';
import styles from './styles.module.css';

const STEPPER_ITEMS = [
	{ title: 'Select Users', key: 'select_users' },
	{ title: 'Set Configuration', key: 'set_configuration' },
	{ title: 'Total Shipment Capacity', key: 'total_shipment_capacity' },
];

function CreateCofiguration() {
	const [activeItem, setActiveItem] = useState('set_configuration');

	const { createCsdConfig } = useCreateCsdConfig();

	const COMPONENT_MAPPING = {
		select_users: {
			component : SelectUsers,
			props     : {
				setActiveItem,
				createCsdConfig,
			},
		},
		set_configuration: {
			component : SetConfiguration,
			props     : {
				setActiveItem,
			},
		},
		total_shipment_capacity: {
			component : TotalShipmentCapacity,
			props     : {
				setActiveItem,
			},
		},
	};

	const { component: ActiveComponent, props: activeComponentProps } = COMPONENT_MAPPING[activeItem];

	return (
		<div className={styles.container}>
			<Stepper active={activeItem} setActive={setActiveItem} items={STEPPER_ITEMS} arrowed />
			<ActiveComponent {...activeComponentProps} />
		</div>

	);
}

export default CreateCofiguration;
