import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getPricingListConfig from '../../../configuration/pricingListConfig';

import Item from './Item';
import styles from './styles.module.css';

const LOADER_COUNT = 4;

function Pricing({ pricing = [], loading = false }) {
	const { t } = useTranslation(['saasSubscription']);

	const pricingListConfig = getPricingListConfig({ t });

	const updatePricing = loading ? [...Array(LOADER_COUNT).keys()] : pricing;

	return (
		<div className={styles.container}>
			<h3>{t('saasSubscription:plan_details_pricing_title')}</h3>

			<div className={cl`${styles.card_header} ${styles.flex_box}`}>
				{pricingListConfig.map((config) => (
					<div key={config.key} className={styles.col} style={{ width: config?.width }}>{config?.title}</div>
				))}
			</div>
			{(updatePricing || [])?.map((item) => (
				<div key={item?.id} className={cl`${styles.flex_box} ${styles.item_row}`}>
					<Item configs={pricingListConfig} item={item} loading={loading} />
				</div>
			))}

		</div>
	);
}

export default Pricing;
