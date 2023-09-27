import { cl } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import { getFeatureMapping } from '../../constant/featureMapping';
import useGetPlanDetails from '../../hooks/useGetPlanDetails';

import Discount from './Discount';
import Header from './Header';
import PlanFeature from './PlanFeature';
import Pricing from './Pricing';
import styles from './styles.module.css';
import UpdateFeatureModal from './UpdateFeatureModal';

function PlanDetails() {
	const { back } = useRouter();
	const { t } = useTranslation(['saasSubscription']);

	const { loading = false, planDetails, featureModal, setFeatureModal } = useGetPlanDetails();

	const { plan = {}, pricing = [], plan_features = [], add_ons = [], discounts = [] } = planDetails || {};

	const featureMapping = getFeatureMapping({ add_ons, plan_features, t });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={23} height={23} onClick={back} />
				<h2>{t('saasSubscription:plan_details_title')}</h2>
			</div>

			<div className={styles.cell}>
				<Header plan={plan} loading={loading} setFeatureModal={setFeatureModal} />
			</div>

			<div className={styles.cell}>
				<Pricing pricing={pricing} loading={loading} />
			</div>

			<div className={styles.flex_box}>
				{featureMapping.map((feature) => (
					<div key={feature.name} className={cl`${styles.cell} ${styles.feature}`}>
						<PlanFeature
							name={feature.name}
							title={feature.title}
							list={feature?.list}
							configs={feature?.config}
							loading={loading}
							setFeatureModal={setFeatureModal}
						/>
					</div>
				))}
			</div>
			<div className={styles.cell}>
				<Discount loading={loading} discounts={discounts} setFeatureModal={setFeatureModal} />
			</div>
			<UpdateFeatureModal featureModal={featureModal} setFeatureModal={setFeatureModal} planId={plan?.id} />
		</div>
	);
}

export default PlanDetails;
