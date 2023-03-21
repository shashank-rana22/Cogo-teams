import Assured from './Assured';
import BLDetails from './BLDetails';
import OverviewManageServices from './OverviewManageServices';
import Services from './Services';
import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

function Overview(shipment_data = {}) {
	return (
		<div className={styles.container}>
			<OverviewManageServices container={styles.container} />
			<BLDetails />
			<Services />
			<div className={styles.extra_details}>
				{shipment_data?.is_cogo_assured ? (
					<Assured shipment_data={shipment_data} />
				) : null}

				{shipment_data?.terms_and_conditions?.length ? (
					<TermsAndConditions shipment_data={shipment_data} />
				) : null}
			</div>
		</div>
	);
}
export default Overview;
