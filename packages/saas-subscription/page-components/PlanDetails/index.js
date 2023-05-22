import { cl } from '@cogoport/components';

import addonConfig from '../../configuration/addonConfig';
import planFeatureConfig from '../../configuration/planFeatureConfig';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';

import Header from './Header';
import PlanFeature from './PlanFeature';
import Pricing from './Pricing';
import styles from './styles.module.css';

function PlanDetails() {
	const { loading, planDetails } = useGetPlanDetails();
	const { plan = {}, pricing = [], plan_features = [] } = planDetails || {};
	const { metadata = {} } = plan || {};
	const { addons = [] } = metadata || {};

	return (
		<div className={styles.container}>
			<h2>Select Plan</h2>

			<div className={styles.cell}>
				<Header plan={plan} />
			</div>

			<div className={styles.cell}>
				<Pricing pricing={pricing} />
			</div>

			<div className={styles.flex_box}>
				<div className={cl`${styles.cell} ${styles.feature}`}>
					<PlanFeature title="Add-ons" list={addons} configs={addonConfig} loading={loading} />
				</div>

				<div className={cl`${styles.cell} ${styles.feature}`}>
					<PlanFeature
						title="Plan Feature"
						list={plan_features}
						configs={planFeatureConfig}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
}

export default PlanDetails;
