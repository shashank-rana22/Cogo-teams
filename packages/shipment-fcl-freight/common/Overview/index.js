import Assured from '@cogoport/ocean-modules/components/Assured';
import TermsAndConditions from '@cogoport/ocean-modules/components/TermsAndConditions';

import BLDetails from './BLDetails';
import OverviewManageServices from './OverviewManageServices';
import styles from './styles.module.css';

function Overview({ shipmentData = {}, stakeholderConfig = {} }) {
	const showTermsAndConditions = !!stakeholderConfig?.overview?.show_terms_and_conditions;

	return (
		<div className={styles.container}>
			<OverviewManageServices source="overview" />
			<BLDetails />
			<div className={styles.extra_details}>
				{shipmentData?.is_cogo_assured ? (
					<Assured shipmentData={shipmentData} />
				) : null}

				{showTermsAndConditions && shipmentData?.terms_and_conditions?.length ? (
					<TermsAndConditions shipmentData={shipmentData} />
				) : null}
			</div>
		</div>
	);
}
export default Overview;
