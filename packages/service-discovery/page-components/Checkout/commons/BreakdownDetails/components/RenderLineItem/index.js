import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import ServiceMargin from './ServiceMargin';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function RenderLineItem({
	lineItem = {},
	setRateDetails = () => {},
	serviceIndex = 0,
	lineItemIndex = 0,
	rate = {},
	shouldEditMargin = false,
	detail = {},
	disableForm = false,
}) {
	const {
		margins = [],
		currency = '',
		total_price_discounted = 0,
		name = '',
		unit = '',
		quantity = 1,
		filteredMargins = {},
		isNew = false,
	} = lineItem;

	const buy_price = total_price_discounted
		- (margins.find((marginObj) => marginObj?.margin_type === 'demand')?.total_margin_value || DEFAULT_VALUE);

	const displayBuyPrice = formatAmount({
		amount  : Number(buy_price),
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 0,
		},
	});

	const onChangeLineItem = ({
		selectedValue,
		setShowPopover = () => {},
		lineItemKey,
	}) => {
		setRateDetails((prev) => prev.map((service, index) => {
			if (index === serviceIndex) {
				const updatedLineItems = service.line_items.map(
					(indLineItem, index2) => {
						if (lineItemIndex === index2) {
							return {
								...indLineItem,
								filteredMargins: {
									...indLineItem.filteredMargins,
									[lineItemKey]: selectedValue,
								},
							};
						}
						return indLineItem;
					},
				);

				return { ...service, line_items: updatedLineItems };
			}
			return service;
		}));

		setShowPopover(false);
	};

	const isLineItemMarginEditAllowed = lineItem?.source !== 'manual';

	const isServiceMarginAllowedRate = ![
		'cogo_assured_rate',
		'contract',
	].includes(rate?.source);

	const isQutationEditAllowed = !(
		detail?.source === 'contract'
		&& detail?.primary_service === 'rail_domestic_freight'
	);

	return (
		<div className={styles.container}>
			<div className={styles.service_name}>{name}</div>
			<div className={styles.currency}>{currency}</div>
			<div className={styles.buy_price}>
				{displayBuyPrice}

				<div className={styles.per_container_value}>
					{`${(Number(buy_price) / quantity).toFixed(2)} ${
						GLOBAL_CONSTANTS.freight_unit_mapping[unit]
						|| `/${startCase(unit || 'Ctr')}`
					}`}
				</div>
			</div>
			<div className={styles.unit}>
				{GLOBAL_CONSTANTS.freight_unit_mapping[unit] || startCase(unit)}
			</div>
			<div className={styles.quantity}>{quantity}</div>

			<ServiceMargin
				serviceIndex={serviceIndex}
				lineItemIndex={lineItemIndex}
				filteredMargins={filteredMargins}
				item={lineItem}
				onChangeLineItem={onChangeLineItem}
				shouldEditMargin={
					(shouldEditMargin
						&& isServiceMarginAllowedRate
						&& isLineItemMarginEditAllowed
						&& isQutationEditAllowed
						&& !disableForm)
					|| isNew
				}
			/>
		</div>
	);
}

export default RenderLineItem;
