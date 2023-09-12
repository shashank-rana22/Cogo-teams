import { isEmpty, startCase } from '@cogoport/utils';

import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import styles from './styles.module.css';

function OrganizationShipment({ shipmentList = [], shipmentLoading = false }) {
	if (shipmentLoading) {
		return <div className={styles.empty_state}>Loading...</div>;
	}

	if (isEmpty(shipmentList)) {
		return <div className={styles.empty_state}>No shipment found</div>;
	}

	return (
		<div className={styles.shipment_container}>
			{(shipmentList || []).map((item) => (
				<div className={styles.details} key={item?.id}>
					<div className={styles.sid_details}>
						SID :
						{' '}
						<span className={styles.title}>
							{item?.serial_id}
						</span>
						<div className={styles.agent_details}>
							Agent :
							{' '}
							<div className={styles.sid}>
								{startCase(item?.booking_agent?.name)}
							</div>
						</div>
					</div>
					<div className={styles.service_type}>
						Shipment Type:
						<div className={styles.sid}>
							{startCase(item?.shipment_type)}
						</div>
					</div>
					<PortDetails serviceData={item} service="shipment_type" />
					<CargoDetails detail={item} service="shipment_type" />
				</div>
			))}
		</div>

	);
}

export default OrganizationShipment;
