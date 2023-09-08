import { Input, Select, Accordion, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import currencies from '../../../../helpers/currencies';
import Promocodes from '../../../Promocodes';
import Spinner from '../../../Spinner';

import ExchangeRate from './ExchangeRate';
import ServiceChargesTitle from './ServiceChargesTitle';
import styles from './styles.module.css';
import useHandleConvenienceDetails from './useHandleConvenienceDetails';

function ConvenienceDetails({
	total = 0,
	convenienceDetails = {},
	setConvenienceDetails = () => {},
	rate = {},
	shouldEditConvenienceFee = false,
	conversions = {},
	detail = {},
	getCheckout = () => {},
	source = '',
	convenienceRateOptions = [],
	checkout_id = '',
	otherCharges = [],
	showTaxes = true,
}) {
	const { convenience_rate = {} } = convenienceDetails || {};

	const { unit = '', currency = '', price = '' } = convenience_rate;

	const { promotions = {} } = rate;

	const {
		onChangeCurrency = () => {},
		subTotalDisplay = '',
		convenienceFeeDisplay = '',
		taxesDisplay = '',
		loading = false,
		convenienceRateMapping = {},
		onChange = () => {},
		localedDiscount,
		discount = 0,
	} = useHandleConvenienceDetails({
		convenienceDetails,
		total,
		convenienceRateOptions,
		rate,
		setConvenienceDetails,
		detail,
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
					discount={discount}
					localedDiscount={localedDiscount}
					showTaxes={showTaxes}
				/>
			)}
			isOpen
		>
			<div className={styles.flex}>
				<div className={styles.left_container}>
					<Promocodes
						checkout_id={checkout_id}
						refetch={getCheckout}
						promotions={promotions.promocodes}
					/>

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
								<span style={{ fontSize: '12px' }}>
									(excl service charges and taxes)
								</span>
							</div>
							<div className={styles.amount}>{subTotalDisplay}</div>
						</div>
					</div>

					{otherCharges.map((item) => {
						const {
							name = '',
							code = '',
							total_price_discounted = 0,
							currency:otherChargesCurrency = '',
						} = item;

						const chargesDisplay = formatAmount({
							amount   : total_price_discounted,
							currency : otherChargesCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						});

						return (
							<div key={code} className={styles.item_container}>
								<div className={styles.convenience_container}>
									<div className={styles.text}>{name}</div>
									<div className={styles.amount}>{chargesDisplay}</div>
								</div>
							</div>
						);
					})}

					<div className={styles.item_container}>
						<div className={styles.convenience_container}>
							<div className={styles.text}>Convenience Fee</div>

							{loading ? <Spinner width="24px" height="24px" /> : null}

							<div className={styles.select_container}>
								<Select
									size="sm"
									options={convenienceRateOptions.map((option) => ({
										label : startCase(option.unit),
										value : option.unit,
									}))}
									value={unit}
									disabled={!shouldEditConvenienceFee || loading}
									style={{ width: '180px' }}
									onChange={(val) => {
										if (val) {
											setConvenienceDetails({
												convenience_rate: convenienceRateMapping[startCase(val)],
											});
										}
									}}
								/>

								<Select
									size="sm"
									options={currencies}
									value={currency}
									disabled={!shouldEditConvenienceFee || loading}
									style={{ marginLeft: '12px' }}
									onChange={onChangeCurrency}
								/>

								<Input
									value={price}
									size="sm"
									onChange={(val) => onChange({ value: val, itemKey: 'price' })}
									style={{ marginLeft: '12px' }}
									disabled={!shouldEditConvenienceFee || loading}
								/>
							</div>
						</div>
					</div>

					{discount ? (
						<div className={styles.item_container}>
							<div className={styles.convenience_container}>
								<div className={styles.text}>Discount</div>
								<div className={styles.amount}>{localedDiscount}</div>
							</div>
						</div>
					) : null}

					{showTaxes ? (
						<div className={styles.item_container}>
							<div className={styles.convenience_container}>
								<div className={styles.text}>Taxes</div>
								<div className={styles.amount}>{taxesDisplay}</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</Accordion>
	);
}

export default ConvenienceDetails;