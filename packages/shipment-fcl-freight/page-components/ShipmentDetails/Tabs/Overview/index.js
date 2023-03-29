import Assured from './Assured';
import BLDetails from './BLDetails';
import OverviewManageServices from './OverviewManageServices';
import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

function Overview({ shipmentData = {} }) {
	return (
		<div className={styles.container}>
			<OverviewManageServices container={styles.container} />
			<BLDetails />
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
