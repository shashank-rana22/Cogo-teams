import { cl } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getPromotionCancellationConfig from '../../../../../../configuration/promotionCancellationConfig';
import getValues from '../../../../../../utils/getValues';
import itemFunction from '../../../../../../utils/itemFunctions';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

function PromotionCancellation({ currentTab, promotion_discount = [], cancellation_discount = [] }) {
	const { t } = useTranslation(['saasSubscription']);

	const data = currentTab === 'promotion' ? promotion_discount : cancellation_discount;

	const promotionCancellationConfig = getPromotionCancellationConfig({ t });

	if (isEmpty(data)) {
		return (
			<EmptyState currentTab={currentTab} />
		);
	}

	return (
		<div className={styles.container}>
			<div className={cl`${styles.header} ${styles.flex_box}`}>
				{promotionCancellationConfig.map((config) => (
					<div
						key={config.key}
						className={cl`${styles.col} ${styles[config?.key]}`}
					>
						{startCase(config.label)}

					</div>
				))}
			</div>

			<div className={styles.scroll_container}>
				{(data || []).map((discount) => (
					<div key={discount?.id} className={styles.flex_box}>
						{promotionCancellationConfig.map((config) => (
							<div key={config.key} className={cl`${styles.col} ${styles[config?.key]}`}>
								{getValues({ itemData: discount, config, itemFunction })}
							</div>
						))}
					</div>
				))}
			</div>

		</div>
	);
}

export default PromotionCancellation;
