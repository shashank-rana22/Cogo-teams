import { cl } from '@cogoport/components';

import pricingListConfig from '../../../configuration/pricingListConfig';

import Item from './Item';
import styles from './styles.module.css';

function Pricing({ pricing = [] }) {
	return (
		<div className={styles.container}>
			<h3>Pricing</h3>
			<div className={cl`${styles.card_header} ${styles.flex_box}`}>
				{pricingListConfig.map((config) => (
					<div key={config.key} className={styles.col} style={{ width: config?.width }}>{config?.title}</div>
				))}
			</div>
			{(pricing || [])?.map((item) => (
				<div key={item?.id} className={cl`${styles.flex_box} ${styles.item_row}`}>
					<Item configs={pricingListConfig} item={item} />
				</div>
			))}
		</div>
	);
}

export default Pricing;
