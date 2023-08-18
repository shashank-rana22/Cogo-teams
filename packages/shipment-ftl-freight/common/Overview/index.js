import Assured from '@cogoport/surface-modules/components/Assured';
import TermsAndConditions from '@cogoport/surface-modules/components/TermsAndConditions';

import FuelPayment from './FuelPayment';
import OverviewManageServices from './OverviewManageServices';
import styles from './styles.module.css';

function Overview({ shipmentData = {} }) {
	return (
		<div className={styles.container}>
			<OverviewManageServices />
			<FuelPayment />
			<div className={styles.extra_details}>
				{shipmentData?.is_cogo_assured ? (
					<Assured shipmentData={shipmentData} />
				) : null}

				{shipmentData?.terms_and_conditions?.length ? (
					<TermsAndConditions shipmentData={shipmentData} />
				) : null}
			</div>
		</div>
	);
}
export default Overview;
