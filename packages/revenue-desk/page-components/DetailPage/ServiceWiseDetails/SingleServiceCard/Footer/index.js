import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format, startCase } from '@cogoport/utils';

import useGetRDWallet from '../../../../../hooks/useGetRDWallet';

import styles from './styles.module.css';

function Footer({ data = {} }) {
	const ZERO_VALUE = 0;
	const { data: walletAmount } = useGetRDWallet({ data });
	const { wallet_amount = '', currency = '' } = walletAmount || {};

	const infoArray = [
		{
			key   : 'Cargo Readiness Date',
			value : data?.cargo_readiness_date && format(data?.cargo_readiness_date, 'dd MMM yyyy'),
		},
		{
			key   : 'Expected Departure Date',
			value : (data?.schedule_departure || data.selected_schedule_departure)
			&& format(data?.schedule_departure || data.selected_schedule_departure, 'dd MMM yyyy'),
		},
		{
			key   : 'SO1',
			value : startCase(data?.service_ops1?.name) || '',
		},
		{
			key   : 'KAM',
			value : data?.booking_agent?.name || '',
		},
		{
			key   : 'Shipment Source',
			value : startCase(data?.source),
		},
		{
			key   : 'Shipping Line',
			value : data?.shipping_line?.business_name,
		},
		{
			key   : 'Preferred Shipping Line',
			value : data?.preferred_shipping_line?.business_name,
		},
	];

	return (
		<div className={styles.container}>
			{infoArray.map((item) => (item.value ? (
				<div className={styles.text} key={item.key}>
					<span style={{ fontWeight: '600' }}>{item.key}</span>
					{' '}
					:
					{' '}
					{item.value}
				</div>
			) : null))}

			<div className={styles.wallet_container}>
				<div className={styles.wallet_text}>
					Wallet Balance -
					<span className={walletAmount > ZERO_VALUE ? styles.price_text : styles.red_text}>
						{formatAmount({
							amount  : wallet_amount,
							currency,
							options : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</span>
				</div>
			</div>

		</div>

	);
}
export default Footer;
