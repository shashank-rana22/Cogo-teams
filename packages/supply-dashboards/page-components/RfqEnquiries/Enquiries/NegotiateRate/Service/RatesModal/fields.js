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
				<img
					src={item?.shipping_line?.logo_url || item?.airline?.logo_url}
					alt=""
					style={{ width: '50px', height: '50px' }}
				/>
				<div>{(item?.shipping_line || item?.airline)?.short_name }</div>

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
				{item?.freight_price_currency
					|| item?.validities?.[0]?.currency
					|| item?.validity?.currency
					|| item?.total_price_currency || item?.customs_price_currency}
				{' '}
				{item?.freight_price
					|| item?.validities?.[0]?.price
					|| item?.validity?.min_price
					|| item?.total_price || item?.customs_price || item?.min_price}
			</div>
		),
		flex: 3,
	},
];

export default columns;
