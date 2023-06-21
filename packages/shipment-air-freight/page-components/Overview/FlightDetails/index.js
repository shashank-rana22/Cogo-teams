import { Accordion } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import MovementDetails from './MovementDetails';
import styles from './styles.module.css';

function FlightDetails() {
	const { primary_service } = useContext(ShipmentDetailContext);

	const getTitle = (
		<div className={styles.title}>Flight Details</div>
	);

	return (
		<div className={styles.container}>
			<Accordion title={getTitle} style={{ width: '100%' }}>

				<div className={styles.manage_services_div}>
					<MovementDetails primary_service={primary_service} />
				</div>

			</Accordion>
		</div>
	);
}

export default FlightDetails;
