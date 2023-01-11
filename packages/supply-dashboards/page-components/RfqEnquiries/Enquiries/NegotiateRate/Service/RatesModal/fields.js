/* eslint-disable jsx-a11y/alt-text */
import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

const columns = [
	{
		label  : '',
		span   : 1,
		render : (item, setSelectedRate, selectedRate) => {
			const handleCheck = () => {
				if (selectedRate === item) {
					setSelectedRate({});
				} else {
					setSelectedRate(item);
				}
			};
			return (
				<div className={styles.val}>
					<Checkbox onChange={() => handleCheck()} checked={selectedRate === item} />
				</div>
			);
		},
	},
	{
		label  : '',
		key    : 'shipping_line',
		render : (item) => (
			<div className={styles.value}>
				<img src={item?.shipping_line?.logo_url} style={{ width: '50px', height: '50px' }} />
				<div>{item?.shipping_line?.short_name}</div>

			</div>

		),
		flex: 4,
	},
	{
		label  : '',
		key    : 'service_provider',
		render : (item) => (
			<div>
				{item?.service_provider?.short_name || item?.service_provider?.business_name}
			</div>
		),
		flex: 5,
	},
	{
		label  : '',
		key    : 'rate',
		render : (item) => (
			<div className={styles.lastval}>
				{item?.freight_price_currency || item?.validities?.[0].currency}
				{' '}
				{item?.freight_price || item?.validities?.[0].price}
			</div>
		),
		flex: 3,
	},
];

export default columns;
