import { cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import addonConfig from '../../configuration/addonConfig';
import planFeatureConfig from '../../configuration/planFeatureConfig';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';

import Header from './Header';
import PlanFeature from './PlanFeature';
import Pricing from './Pricing';
import styles from './styles.module.css';
import UpdateFeatureModal from './UpdateFeatureModal';

function PlanDetails() {
	const { back } = useRouter();
	const [featureModal, setFeatureModal] = useState({});

	const { loading = false, planDetails } = useGetPlanDetails();
	const { plan = {}, pricing = [], plan_features = [] } = planDetails || {};
	const { metadata = {} } = plan || {};
	const { addons = [] } = metadata || {};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={23} height={23} onClick={back} />
				<h2>Select Plan</h2>
			</div>
			<div className={styles.cell}>
				<Header plan={plan} loading={loading} />
			</div>
			<div className={styles.cell}>
				<Pricing pricing={pricing} loading={loading} />
			</div>
			<div className={styles.flex_box}>
				<div className={cl`${styles.cell} ${styles.feature}`}>
					<PlanFeature
						title="Add-ons"
						list={addons}
						configs={addonConfig}
						loading={loading}
						setFeatureModal={setFeatureModal}

					/>
				</div>
				<div className={cl`${styles.cell} ${styles.feature}`}>
					<PlanFeature
						title="Plan Feature"
						list={plan_features}
						configs={planFeatureConfig}
						loading={loading}
						setFeatureModal={setFeatureModal}
					/>
				</div>
			</div>
			<UpdateFeatureModal featureModal={featureModal} setFeatureModal={setFeatureModal} />
		</div>
	);
}

export default PlanDetails;
