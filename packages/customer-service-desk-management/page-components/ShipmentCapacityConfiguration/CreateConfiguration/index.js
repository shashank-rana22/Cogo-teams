import { Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
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
	const router = useRouter();

	const [activeItem, setActiveItem] = useState('select_users');

	const { loading, createCsdConfig } = useCreateCsdConfig({ setActiveItem });

	const COMPONENT_MAPPING = {
		select_users: {
			component : SelectUsers,
			props     : {
				setActiveItem,
				loading,
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

			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => router.push('/customer-service-desk-management')}
				/>

				<div role="presentation" className={styles.title}>New Config. Creation</div>
			</div>

			<Stepper active={activeItem} setActive={setActiveItem} items={STEPPER_ITEMS} arrowed />
			<ActiveComponent {...activeComponentProps} />
		</div>

	);
}

export default CreateCofiguration;
