import { ShipmentDetailContext } from '@cogoport/context';
import Assured from '@cogoport/surface-modules/components/Assured';
import TermsAndConditions from '@cogoport/surface-modules/components/TermsAndConditions';
import { useContext } from 'react';

import OverviewManageServices from './OverviewManageServices';
import styles from './styles.module.css';

function Overview() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<OverviewManageServices />

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
