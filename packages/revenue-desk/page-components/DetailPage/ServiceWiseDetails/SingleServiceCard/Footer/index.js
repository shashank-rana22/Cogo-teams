import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format, startCase, isEmpty } from '@cogoport/utils';

import { VALUE_ZERO } from '../../../../constants';

import styles from './styles.module.css';

function Footer({ data = {}, walletAmount = {} }) {
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

	function Content() {
		return (
			<div>
				<ui>
					<li>
						<span className={styles.price_text}>Min Price :</span>
						{' '}
						<span className={styles.wallet_text}>
							{formatAmount({
								amount   : data?.shipping_preferences?.min_price,
								currency : data?.shipping_preferences?.currency,
								options  : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</li>
					<li>
						<span className={styles.price_text}>Max Price :</span>
						{' '}
						<span className={styles.wallet_text}>
							{formatAmount({
								amount   : data?.shipping_preferences?.max_price,
								currency : data?.shipping_preferences?.currency,
								options  : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</li>
					<div style={{ marginTop: '10px' }}>
						<li>
							<span className={styles.price_text}>Preferred Shipping Lines :</span>
							{' '}
							{(data?.shipping_preferences?.preferred_shipping_lines || []).map((shipping_line) => (
								<div style={{ margin: '0 6px' }} key={shipping_line?.id}>
									<li><span className={styles.wallet_text}>{shipping_line?.business_name}</span></li>
								</div>
							))}
						</li>
					</div>
				</ui>
			</div>
		);
	}

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
			{!isEmpty(data?.shipping_preferences) && (
				<div className={styles.text}>
					<span
						style={{ fontWeight: '600', fontSize: '12px' }}
					>
						Shipping Preferences:-

					</span>
					<Tooltip content={Content()} interactive style={{ width: 'fit-content' }}>
						<div style={{ textDecoration: 'underline' }}>view</div>
					</Tooltip>
				</div>
			)}

			<div className={styles.wallet_container}>
				<div className={styles.wallet_text}>
					Wallet Balance :
					{' '}
					<span className={wallet_amount > VALUE_ZERO ? styles.price_text : styles.red_text}>
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
