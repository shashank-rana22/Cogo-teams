import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function QuotaDetails({ editModalChangeHandler, quotas = [], currentTab }) {
	const { t } = useTranslation(['saasSubscription']);

	if (isEmpty(quotas)) {
		return <EmptyState currentTab={currentTab} />;
	}
	return (
		<div className={styles.container}>

			<div className={cl`${styles.flex_box} ${styles.card_header}`}>
				<div className={styles.product_name}>{t('saasSubscription:quota_details_product')}</div>
				<div className={styles.addon}>{t('saasSubscription:quota_details_addon')}</div>
				<div className={styles.total_addon}>{t('saasSubscription:quota_details_quota')}</div>
				<div className={styles.edit} />
			</div>

			<div className={styles.scroll_container}>
				{(quotas || []).map((item) => 	{
					const { id = '', product = {}, left_limit = 0, addon_limit = 0, total_limit = 0 } = item;

					return (
						<div key={id} className={cl`${styles.flex_box} ${styles.quota_row}`}>
							<div className={styles.product_name}>{startCase(product?.product_name)}</div>

							<div className={cl`${styles.quota_quantity} ${styles.addon}`}>
								<span>{addon_limit}</span>
							</div>

							<div className={cl`${styles.quota_quantity} ${styles.total_addon}`}>
								<span>
									{total_limit}
									/
									{left_limit}
								</span>
							</div>

							<div className={styles.edit}>
								<IcMEdit
									className={styles.edit_icon}
									onClick={() => {
										editModalChangeHandler({
											activeComp : 'edit_addon',
											extraInfo  : item,
										});
									}}
								/>
							</div>

						</div>
					);
				})}
			</div>

		</div>
	);
}

export default QuotaDetails;
