import { startCase } from '@cogoport/utils';

import getShippingLine from '../../../../utils/getShippingLine';
import RenderLineItem from '../RenderLineItem';

import styles from './styles.module.css';

const renderServiceType = ({ item, service_details, primaryService }) => {
	const serviceName = item.service_name
		? item?.service_name
		: item.service_type;
	if (item.service_type === 'fcl_freight') {
		return getShippingLine(item?.service_type, primaryService);
	}
	if (item.service_type === 'air_freight') {
		return getShippingLine(item?.service_type, primaryService);
	}
	if (item.service_type === 'cargo_insurance') {
		return startCase(serviceName);
	}
	if (item?.trade_type) {
		if (item?.trade_type === 'export') {
			return startCase(`origin_${serviceName}`);
		}
		if (item?.trade_type === 'import') {
			return startCase(`destination_${serviceName}`);
		}
	}
	if (
		service_details?.service_type === 'air_freight_local'
        && service_details?.trade_type === 'domestic'
	) {
		return `Terminal ${startCase(service_details?.terminal_charge_type)}`;
	}
	return startCase(serviceName || '');
};

function ServiceBreakup({
	item = {}, index, conversions, detail, primaryService, rate, setRateDetails, fclLocalEmpty, shouldEditMargin,
}) {
	const serviceKey = item?.id;

	// const serviceEditedMargins = editedMargins?.[serviceKey];

	// const totalDisplay = displayTotal(
	// 	item?.line_items || [],
	// 	item?.defaultValues,
	// 	conversions,
	// 	item?.tax_total_price_currency,
	// );

	const service_details = detail?.services?.[item?.id];

	const total = 0;

	// total += convertCurrencyValue(
	// 	Number(Math.floor(totalDisplay)),
	// 	item?.tax_total_price_currency,
	// 	rate?.total_price_currency,
	// 	conversions,
	// );

	// const totalDisplayString = formatAmount({
	// 	amount   : totalDisplay,
	// 	currency : item.tax_total_price_currency,
	// 	options  : {
	// 		style                 : 'currency',
	// 		currencyDisplay       : 'code',
	// 		maximumFractionDigits : 0,
	// 	},
	// });

	if (fclLocalEmpty) {
		return (
			<div style={{ marginTop: '12px' }}>
				<div>Locals charges will be billed at Actual</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(item?.line_items || []).map((lineItem, itemIndex) => (
				<RenderLineItem
					key={lineItem?.product_code}
					lineItem={lineItem}
					id_prefix={`${index}_${itemIndex}`}
					setRateDetails={setRateDetails}
					serviceIndex={index}
					lineItemIndex={itemIndex}
					rate={rate}
					shouldEditMargin={shouldEditMargin}
					detail={detail}
					service_type={item.service_type}
				/>
			))}
		</div>
	);
}

export default ServiceBreakup;
