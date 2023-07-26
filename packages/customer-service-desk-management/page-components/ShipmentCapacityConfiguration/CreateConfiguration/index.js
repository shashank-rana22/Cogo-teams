import { Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useCreateCsdConfig from '../../../hooks/useCreateCsdConfig';
import useGetCsdConfigurations from '../../../hooks/useGetCsdConfigurations';

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
	const [routeLoading, setRouteLoading] = useState(false);

	const { loading, createCsdConfig } = useCreateCsdConfig({ setActiveItem });
	const { list = [] } = useGetCsdConfigurations('create');

	const data = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const COMPONENT_MAPPING = {
		select_users: {
			component : SelectUsers,
			props     : {
				setActiveItem,
				loading,
				createCsdConfig,
				data,
				routeLoading,
			},
		},
		set_configuration: {
			component : SetConfiguration,
			props     : {
				setActiveItem,
				data,
				routeLoading,
			},
		},
		total_shipment_capacity: {
			component : TotalShipmentCapacity,
			props     : {
				setActiveItem,
				routeLoading,
			},
		},
	};

	const { component: ActiveComponent, props: activeComponentProps } = COMPONENT_MAPPING[activeItem];

	useEffect(() => {
		router.events.on('routeChangeStart', () => setRouteLoading(true));
		router.events.on('routeChangeComplete', () => setRouteLoading(false));

		return () => {
			router.events.off('routeChangeStart', () => setRouteLoading(true));
			router.events.off('routeChangeComplete', () => setRouteLoading(false));
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

			<Stepper
				active={activeItem}
				setActive={setActiveItem}
				items={STEPPER_ITEMS}
				arrowed
			/>
			<ActiveComponent {...activeComponentProps} />
		</div>

	);
}

export default CreateCofiguration;
