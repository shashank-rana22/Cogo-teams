import { ShipmentDetailContext } from '@cogoport/context';
import { TermsAndConditions } from '@cogoport/surface-modules';
import { useContext, useEffect } from 'react';

import Inventory from './Inventory';
import ManageServices from './ManageServices';
import styles from './styles.module.css';

// const notToShowManageServices = ['service_ops1', 'service_ops2']; // send to stakeholder_config

function Overview() {
	const { shipment_data, refetchServices = () => {} } = useContext(ShipmentDetailContext);

	useEffect(() => {
		refetchServices();
	}, [refetchServices]);

	return (
		<div className={styles.container}>
			<ManageServices />

			<Inventory />

			{shipment_data?.terms_and_conditions?.length ? (
				<TermsAndConditions shipmentData={shipment_data} />
			) : null}
		</div>
	);
}

export default Overview;
