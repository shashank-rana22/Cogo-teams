import { Input, Select } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import currencies from '../../../../helpers/currencies';

import styles from './styles.module.css';

function ConvenienceDetails({
	total,
	convenienceDetails,
	setConvenienceDetails,
	rate,
	disableForm,
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

	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				<div className={styles.convenience_container}>
					<div className={styles.text}>Sub Total</div>
					<div className={styles.amount}>
						{formatAmount({
							amount   : subTotal,
							currency : rate?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</div>
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
					<div className={styles.amount}>
						{formatAmount({
							amount   : rate?.tax_price_discounted,
							currency : rate?.tax_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConvenienceDetails;
