import { Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetCcsShipmentCapacityDetails from '../../../hooks/useGetCcsShipmentCapacityDetails';

import SetConfiguration from './components/SetConfiguration';
import TotalShipmentCapacity from './components/TotalShipmentCapacity';
import styles from './styles.module.css';

const STEPPER_ITEMS = [
	{ title: 'Set Configuration', key: 'set_configuration' },
	{ title: 'Total Shipment Capacity', key: 'total_shipment_capacity' },
];

function CreateCofiguration() {
	const router = useRouter();

	const [activeItem, setActiveItem] = useState('set_configuration');
	const [routeLoading, setRouteLoading] = useState(false);

	const { list = [], fetchList, loading } = useGetCcsShipmentCapacityDetails('create');

	const data = list[GLOBAL_CONSTANTS.zeroth_index] || {};

	const COMPONENT_MAPPING = {
		set_configuration: {
			component : SetConfiguration,
			props     : {
				setActiveItem,
				data,
				routeLoading,
				fetchList,
				loading,
			},
		},
		total_shipment_capacity: {
			component : TotalShipmentCapacity,
			props     : {
				setActiveItem,
				routeLoading,
				fetchList,
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
					onClick={() => router.push('/centralised-customer-service?activeTab=shipment_capacity_config')}
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
