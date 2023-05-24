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
	const { plan = {}, pricing = [], plan_features = [], add_ons } = planDetails || {};

	const featureMapping = [
		{
			title  : 'Add-ons',
			list   : add_ons || [],
			config : addonConfig,
		},
		{
			title  : 'Plan Feature',
			list   : plan_features || [],
			config : planFeatureConfig,
		},
	];

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
				{featureMapping.map((feature) => (
					<div key={feature.title} className={cl`${styles.cell} ${styles.feature}`}>
						<PlanFeature
							title={feature.title}
							list={feature?.list}
							configs={feature?.config}
							loading={loading}
							setFeatureModal={setFeatureModal}
						/>
					</div>
				))}
			</div>
			<UpdateFeatureModal featureModal={featureModal} setFeatureModal={setFeatureModal} />
		</div>
	);
}

export default PlanDetails;
