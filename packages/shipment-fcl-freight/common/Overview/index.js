import Assured from '@cogoport/ocean-modules/components/Assured';
import TermsAndConditions from '@cogoport/ocean-modules/components/TermsAndConditions';

import BLDetails from './BLDetails';
import OverviewManageServices from './OverviewManageServices';
// import Services from './Services';
import styles from './styles.module.css';

function Overview({ shipmentData = {} }) {
	return (
		<div className={styles.container}>
			<OverviewManageServices />
			<BLDetails />
			{/* <Services /> */}
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
