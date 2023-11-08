import { Select, Tooltip, Input } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';

import CodeMargin from './CodeMargin';
import styles from './styles.module.css';

const ONE = 1;
const PERCENT_VALUE = 100;
const ROUND_OFF_VALUE = 2;

function ServiceMargin({
	serviceIndex = 0,
	lineItemIndex = 0,
	filteredMargins = {},
	item = {},
	onChangeLineItem = () => {},
	shouldEditMargin = false,
	isautoDiscountApplicable = false,
	description = '',
	promotion_discounts = {},
}) {
	const { type, value } = filteredMargins;

	const { value:discountValue = 0 } = promotion_discounts || {};

	const onChange = (selectedValue) => {
		onChangeLineItem({ selectedValue, lineItemKey: 'type' });
	};

	return (
		<>
			<div className={styles.currency} style={{ width: '10%' }}>
				<Select
					value={type}
					onChange={onChange}
					disabled={!shouldEditMargin}
					size="sm"
					options={[
						{
							label : 'Total',
							value : 'absolute_total',
						},
						{
							label : 'Unit',
							value : 'absolute_unit',
						},
					]}
				/>
			</div>

			<div className={styles.currency}>
				<Input
					size="sm"
					disabled={!shouldEditMargin}
					value={value}
					type="number"
					onChange={(selectedValue) => onChangeLineItem({ selectedValue, lineItemKey: 'value' })}
				/>

				{isautoDiscountApplicable ? (
					<div className={styles.flex}>
						<div className={styles.applicable_margin}>
							Applied:
							{' '}
							{(value * (ONE - discountValue / PERCENT_VALUE)).toFixed(ROUND_OFF_VALUE)}
						</div>

						<Tooltip
							interactive
							content={description || `There is discount of ${value}% on this line item`}
						>
							<IcMInformation width={12} height={12} fill="#849e4c" />
						</Tooltip>
					</div>
				) : null}
			</div>

			<div className={styles.currency}>
				<CodeMargin
					item={item}
					editedDemandMargin={filteredMargins}
					id_prefix={`${serviceIndex}_${lineItemIndex}`}
					isautoDiscountApplicable={isautoDiscountApplicable}
					promotion_discounts={promotion_discounts}
				/>
			</div>
		</>
	);
}

export default ServiceMargin;
