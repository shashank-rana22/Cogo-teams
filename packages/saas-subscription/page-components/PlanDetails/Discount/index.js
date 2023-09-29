import { Placeholder, Button, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getDiscountConfig from '../../../configuration/discountConfig';
import getValues from '../../../utils/getValues';

import DiscountModal from './DiscountModal';
import getItemFunction from './itemFunction';
import styles from './styles.module.css';

function Discount({ planId = '', discounts = [], loading = false, setFeatureModal }) {
	const { t } = useTranslation(['saasSubscription']);

	const [discountModal, setDiscountModal] = useState({ open: false });

	const discountConfig = getDiscountConfig({ t });

	const itemFunction = getItemFunction({ setDiscountModal, t });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{t('saasSubscription:discount')}</h3>

				<Button
					themeType="secondary"
					onClick={() => setDiscountModal({ open: true, isCreate: true, planId })}
				>
					{t('saasSubscription:create')}
				</Button>
			</div>

			<div className={cl`${styles.card_header} ${styles.flex_box}`}>
				{discountConfig.map((config) => (
					<div
						key={config.key}
						className={styles.col}
						style={{ width: config?.width }}
					>
						{startCase(config?.label)}

					</div>
				))}
			</div>

			<div>
				{(discounts || []).map((ele) => (
					<div key={ele?.id} className={cl`${styles.flex_box} ${styles.item_row}`}>
						{discountConfig.map((config) => (
							<div key={config.key} className={styles.col} style={{ width: config?.width }}>
								{loading ? <Placeholder /> : getValues({ itemData: ele, config, itemFunction })}
							</div>
						))}
					</div>
				))}
			</div>
			{discountModal.open
				? (
					<DiscountModal
						discountModal={discountModal}
						setDiscountModal={setDiscountModal}
						setFeatureModal={setFeatureModal}
					/>
				) : null}
		</div>
	);
}

export default Discount;
