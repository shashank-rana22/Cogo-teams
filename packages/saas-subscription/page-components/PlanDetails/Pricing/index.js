import { cl } from '@cogoport/components';

import pricingListConfig from '../../../configuration/pricingListConfig';

import Item from './Item';
import styles from './styles.module.css';

const data = [
	{
		period   : 'Month',
		currency : 'INR',
		price    : '8000',
		discount : '20',
	},
	{
		period   : 'Yearly',
		currency : 'INR',
		price    : '8000',
		discount : '20',
	},
];

function Pricing() {
	return (
		<div className={styles.container}>
			<h3>Pricing</h3>
			<div className={cl`${styles.card_header} ${styles.flex_box}`}>
				{pricingListConfig.map((config) => (
					<div className={styles.col} style={{ width: config?.width }}>{config?.title}</div>
				))}
			</div>
			{data.map((item) => (
				<div className={styles.flex_box}>
					<Item configs={pricingListConfig} item={item} />
				</div>
			))}
		</div>
	);
}

export default Pricing;
