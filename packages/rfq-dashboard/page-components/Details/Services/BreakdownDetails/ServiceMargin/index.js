import { Tags } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import ContainerInfo from '../../../../../common/ContainerInfo';
import shippingLine from '../../../../../common/shippingLine';

import RenderLineItem from './renderLineItem';
import styles from './styles.module.css';

function ServiceTotalAmountContainer({ item, totalDisplayString, fclLocalEmpty }) {
	if (item?.total_price_discounted) {
		return (
			<div className={styles.service_total_amount}>
				Total :

				{` ${totalDisplayString}`}
			</div>
		);
	}

	return (
		<div className={styles.service_total_amount}>
			{!item?.total_price_discounted && !fclLocalEmpty ? (
				<Tags>No Rates</Tags>
			) : null}
		</div>
	);
}

const renderServiceType = ({ serviceDetails, primaryService, item }) => {
	const serviceName = item?.service_name
		? item?.service_name
		: item.service_type;
	if (item.service_type === 'fcl_freight') {
		return shippingLine(item?.service_type, primaryService);
	}
	if (item.service_type === 'air_freight') {
		return shippingLine(item?.service_type, primaryService);
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
		serviceDetails?.service_type === 'air_freight_local'
		&& serviceDetails?.trade_type === 'domestic'
	) {
		return `Terminal ${startCase(serviceDetails?.terminal_charge_type)}`;
	}
	return startCase(serviceName || '');
};

function ServiceMargin({
	item,
	editedMargins,
	detail,
	primaryService,
	totalDisplay,
	setEditedMargins = () => {},
}) {
	const service_details = detail?.service_details?.[item?.id];

	const totalDisplayString = formatAmount({
		amount   : totalDisplay,
		currency : item.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	const fclLocalEmpty = item?.line_items?.length === 0
	&& ([
		'fcl_freight_local_service',
		'fcl_freight_local',
		'air_freight_local']
		.includes(item?.service_type));

	return (
		<div className={styles.container}>
			<div className={styles.service_line}>
				<div className={styles.service_title}>
					{renderServiceType({ item, service_details, primaryService })}
				</div>
				<ServiceTotalAmountContainer
					item={item}
					totalDisplayString={totalDisplayString}
					fclLocalEmpty={fclLocalEmpty}
				/>
			</div>

			{(item?.total_price_discounted || fclLocalEmpty) && (
				<div className={styles.shipment_tags}>
					<ContainerInfo primaryService={service_details} />
				</div>
			)}

			{fclLocalEmpty && (
				<div className={styles.local_rate}>Locals charges will be billed at Actual</div>
			)}

			{(item?.line_items || []).map((lineItem) => (
				<RenderLineItem
					key={lineItem?.code}
					lineItem={lineItem}
					item={item}
					editedMargins={editedMargins}
					setEditedMargins={setEditedMargins}
				/>
			))}
		</div>
	);
}

export default ServiceMargin;
