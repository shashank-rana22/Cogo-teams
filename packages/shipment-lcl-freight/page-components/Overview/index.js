import { ShipmentDetailContext } from '@cogoport/context';
import Assured from '@cogoport/ocean-modules/components/Assured';
import TermsAndConditions from '@cogoport/ocean-modules/components/TermsAndConditions';
import { useContext } from 'react';

import BLDetails from './BLDetails';
import OverviewManageServices from './OverviewManageServices';
import styles from './styles.module.css';

function Overview() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<OverviewManageServices />

			<BLDetails />

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
