import { isEmpty, startCase } from '@cogoport/utils';

import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import styles from './styles.module.css';

function OrganizationShipment({ shipmentList = [] }) {
	if (isEmpty(shipmentList)) {
		return <div className={styles.empty_state}>No shipment found</div>;
	}

	return (
		<div className={styles.shipment_container}>

			{(shipmentList || []).map((item) => (
				<div className={styles.details} key={item?.id}>
					<PortDetails serviceData={item} service="shipment_type" />
					<CargoDetails detail={item} service="shipment_type" />
					<div className={styles.agent_details}>
						Agent :-
						{' '}
						<span className={styles.title}>
							{startCase(item?.agent?.name)}
						</span>
					</div>
				</div>
			))}
		</div>

	);
}

export default OrganizationShipment;
