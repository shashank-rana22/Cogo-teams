import { Input, Select, Accordion, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import currencies from '../../../../helpers/currencies';

import ExchangeRate from './ExchangeRate';
import ServiceChargesTitle from './ServiceChargesTitle';
import styles from './styles.module.css';

function ConvenienceDetails({
	total = 0,
	convenienceDetails = {},
	setConvenienceDetails = () => {},
	rate = {},
	disableForm = false,
	conversions = {},
	detail = {},
	getCheckout = () => {},
	source = '',
}) {
	const subTotal = total;

	const onChange = ({ value, itemKey }) => {
		setConvenienceDetails((prev) => ({
			convenience_rate: {
				...prev.convenience_rate,
				[itemKey]: value,
			},
		}));
	};

	const taxesDisplay = formatAmount({
		amount   : rate?.tax_price_discounted,
		currency : rate?.tax_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	const convenienceFeeDisplay = formatAmount({
		amount   : convenienceDetails?.convenience_rate.price,
		currency : convenienceDetails?.convenience_rate.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	const subTotalDisplay = formatAmount({
		amount   : subTotal,
		currency : rate?.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	return (
		<Accordion
			className={cl`${styles.container} ${styles[source]}`}
			animate
			title={(
				<ServiceChargesTitle
					convenienceFeeDisplay={convenienceFeeDisplay}
					taxesDisplay={taxesDisplay}
					subTotalDisplay={subTotalDisplay}
				/>
			)}
		>
			<div className={styles.flex}>
				<div className={styles.left_container}>
					<ExchangeRate
						conversions={conversions}
						rate={rate}
						detail={detail}
						getCheckout={getCheckout}
					/>
				</div>

				<div className={styles.right_container}>
					<div className={styles.item_container}>
						<div className={styles.convenience_container}>
							<div className={styles.text}>
								Sub Total
								{' '}
								<span style={{ fontSize: '12px' }}>(excl service charges and taxes)</span>
							</div>
							<div className={styles.amount}>{subTotalDisplay}</div>
						</div>
					</div>

					<div className={styles.item_container}>
						<div className={styles.convenience_container}>
							<div className={styles.text}>Convenience Fee</div>

							<div className={styles.select_container}>
								<Select
									size="sm"
									options={currencies}
									value={convenienceDetails?.convenience_rate.currency}
									disabled={disableForm}
									onChange={(val) => {
										if (val) {
											onChange({ value: val, itemKey: 'currency' });
										}
									}}
								/>

								<Input
									value={convenienceDetails?.convenience_rate.price}
									size="sm"
									onChange={(val) => onChange({ value: val, itemKey: 'price' })}
									style={{ marginLeft: '12px' }}
									disabled={disableForm}
								/>
							</div>
						</div>
					</div>

					<div className={styles.item_container}>
						<div className={styles.convenience_container}>
							<div className={styles.text}>Taxes</div>
							<div className={styles.amount}>{taxesDisplay}</div>
						</div>
					</div>
				</div>
			</div>
		</Accordion>
	);
}

export default ConvenienceDetails;
