import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function QuotaDetails({ setEditModal, quotas = [] }) {
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.card_header}`}>
				<div>Products</div>
				<div>Quota</div>
			</div>
			<div className={styles.scroll_container}>
				{quotas.map((item) => 	{
					const { id = '', product = {}, left_limit = 0, addon_limit = 0 } = item;
					const quotaLeft = +left_limit + +addon_limit;
					return (
						<div key={id} className={cl`${styles.flex_box} ${styles.quota_row}`}>
							<div>{startCase(product?.product_name)}</div>

							<div className={styles.quota_quantity}>
								<span>{quotaLeft}</span>
								<IcMEdit
									className={styles.edit_icon}
									onClick={() => setEditModal((prev) => ({
										...prev,
										openEditFeatureModal : true,
										editAddon            : true,
										editPlan             : false,
										featureInfo          : item,
									}))}
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
