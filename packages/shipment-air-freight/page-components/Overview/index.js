import Assured from '@cogoport/air-modules/components/Assured';
import TermsAndConditions from '@cogoport/air-modules/components/TermsAndConditions';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import OverviewManageServices from '../../commons/OverviewManageServices';

import AWBDetails from './AWBDetails';
import FlightDetails from './FlightDetails';
import styles from './styles.module.css';

function Overview() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<OverviewManageServices />

			<AWBDetails />

			<FlightDetails />

			<div className={styles.extra_details}>
				{shipment_data?.is_cogo_assured ? (
					<Assured shipmentData={shipment_data} />
				) : null}

				{shipment_data?.terms_and_conditions?.length ? (
					<TermsAndConditions shipmentData={shipment_data} />
				) : null}
			</div>
		</div>
	);
}
export default Overview;
