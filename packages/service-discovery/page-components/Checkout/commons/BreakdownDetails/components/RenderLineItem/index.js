import { Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../context';

import ServiceMargin from './ServiceMargin';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const ROUND_OFF_VALUE = 2;

function RenderLineItem({
	lineItem = {},
	setRateDetails = () => {},
	serviceIndex = 0,
	lineItemIndex = 0,
	disableForm = false,
	item = {},
}) {
	const {
		rate,
		detail,
		getCheckout,
		shouldEditMargin,
		checkout_id,
		loading:checkoutLoading,
	} = useContext(CheckoutContext);

	const {
		margins = [],
		currency = '',
		total_price_discounted = 0,
		name = '',
		unit = '',
		quantity = 1,
		filteredMargins = {},
		isNew = false,
		is_added = false,
		code = '',
	} = lineItem;

	const { id:itemId = '' } = item;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout_customize_quotation',
	}, { manual: true });

	const buy_price = total_price_discounted
		- (margins.find((marginObj) => marginObj?.margin_type === 'demand')?.total_margin_value || DEFAULT_VALUE);

	const displayBuyPrice = formatAmount({
		amount  : Number(buy_price),
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 2,
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

	const handleDelete = async () => {
		const body = {
			id                   : checkout_id,
			line_items_to_delete : { [itemId]: [code] },
			get_checkout_data    : true,
		};

		try {
			await trigger({ data: body });

			getCheckout();
		} catch (err) {
			Toast.error(err.response?.data);
		}
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
			<div className={styles.service_name}>
				{name}
				{is_added && !detail.quotation_email_sent_at ? (
					<Button
						type="button"
						size="sm"
						themeType="secondary"
						style={{ marginLeft: '16px' }}
						onClick={handleDelete}
						loading={loading || checkoutLoading}
					>
						Delete
					</Button>
				) : null}
			</div>

			<div className={styles.currency}>{currency}</div>
			<div className={styles.buy_price}>
				{displayBuyPrice}

				<div className={styles.per_container_value}>
					{`${(Number(buy_price) / quantity).toFixed(ROUND_OFF_VALUE)} ${
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
						&& !disableForm
						&& item?.service_type !== 'cargo_insurance')
					|| isNew
				}
			/>
		</div>
	);
}

export default RenderLineItem;
