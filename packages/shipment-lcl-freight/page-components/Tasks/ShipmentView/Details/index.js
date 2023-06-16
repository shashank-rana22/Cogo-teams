import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import useGetShipment from '../../../../hooks/useGetShipment';
import useListShipmentServices from '../../../../hooks/useListShipmentServices';
import Card from '../Card';
import Task from '../Task';

import styles from './styles.module.css';

const SERVICE_STATE = ['active', 'pending'];

function Details({ shipment_details = {} }) {
	const [show, setShow] = useState(false);

	const { servicesList = [], refetchServices, servicesLoading } = useListShipmentServices({
		defaultFilters: {
			shipment_id : shipment_details?.id,
			status      : SERVICE_STATE,
		},
		defaultParams: {
			service_stakeholder_required : true,
			page_limit                   : 100,
		},
	});

	const { shipment_data = {}, primary_service = {}, isGettingShipment, refetch:getShipment } = useGetShipment({
		defaultParams: {
			id: shipment_details.id,
		},
		initialCall: false,
	});

	useEffect(() => { refetchServices(); }, [refetchServices, shipment_details.id]);
	return (
		<div>
			<Card shipment_details={shipment_details} />
			{!show ? (
				<div className={styles.action_container}>
					<Button
						onClick={() => {
							getShipment();
							setShow(!show);
						}}
						themeType="tertiary"
					>
						<IcMArrowDown />
						&nbsp;View More
					</Button>
				</div>
			) : null}

			{show ? (
				<Task
					shipment_data={shipment_data}
					services={servicesList}
					isShipmentLoading={isGettingShipment || servicesLoading}
					show={show}
					primary_service={primary_service}
				/>
			) : null}

			{show ? (
				<div className={styles.action_container}>
					<Button onClick={() => { setShow(!show); }} themeType="tertiary">
						<IcMArrowUp />
						&nbsp; View Less
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Details;
