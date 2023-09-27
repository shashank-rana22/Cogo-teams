import { Placeholder, Button, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getDiscountConfig from '../../../configuration/discountConfig';
import getValues from '../../../utils/getValues';

import DiscountModal from './DiscountModal';
import getItemFunction from './itemFunction';
import styles from './styles.module.css';

function Discount({ discounts = [], loading = false, setFeatureModal }) {
	const [discountModal, setDiscountModal] = useState({ open: false });

	const discountConfig = getDiscountConfig();

	const itemFunction = getItemFunction({ setDiscountModal });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Discount</h3>

				<Button
					themeType="secondary"
					onClick={() => setDiscountModal({ open: true, isCreate: true })}
				>
					Create
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
