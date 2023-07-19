import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { convertCurrencyValue } from '../../../../../../../../helpers/dynamic-values';
// eslint-disable-next-line max-len
import ShippingLineDetails from '../../../../../../../../page-components/FclCheckout/components/PreviewBooking/components/BookingPreview/BookingDetails/ShippingLineDetails';
import ServiceIcon from '../../../../../../commons/ServiceIcon';

import DashedLine from './DashedLine';
import styles from './styles.module.css';

const formatSavedServicesInvoiceTo = ({ service = {} }) => {
	const TRADE_TYPE_MAPPING = {
		export : 'origin',
		import : 'destination',
	};

	const { trade_type: tradeType, service_name, service_type } = service || {};

	let serviceName = service_name || service_type;

	if (tradeType in TRADE_TYPE_MAPPING && serviceName !== 'cargo_insurance') {
		serviceName = `${TRADE_TYPE_MAPPING[tradeType]}_${serviceName}`;
	}

	return startCase(serviceName);
};

function AmountDisplay({ rateObject = {}, conversions = {}, currency = '' }) {
	const {
		source = '',
		tax_total_price_discounted = 0,
		tax_total_price_currency = '',
	} = rateObject;

	if (source === 'billed_at_actuals') {
		return <div>Billed at actuals</div>;
	}

	const finalAmount = convertCurrencyValue(
		tax_total_price_discounted,
		tax_total_price_currency,
		currency,
		conversions,
	);

	return (
		<div className={styles.flex}>
			<div>Basic Freight :</div>

			<div className={styles.bold}>
				{formatAmount({
					amount  : finalAmount,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
				{' '}
			</div>
		</div>
	);
}

function ServiceInfo({ serviceDetail = {}, rateObject = {}, conversions = {}, currency = '' }) {
	const {
		service_type = '',
		shipping_line = '',
		destination_port = {},
		origin_port = {},
		arrival = '',
		departure = '',
		transit_time = 0,
	} = serviceDetail;

	const { port_code: originPortCode = '' } = origin_port;
	const { port_code: destinationPortCode = '' } = destination_port;

	if (service_type === 'fcl_freight') {
		return (
			<div className={styles.container}>
				<ShippingLineDetails shipping_line={shipping_line} />

				<div className={styles.location_details}>
					<div className={styles.port_code}>
						<div className={styles.port_label}>{originPortCode}</div>

						<div className={styles.date}>
							{formatDate({
								date       : departure,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								formatType : 'date',
							})}
						</div>
					</div>

					<DashedLine transit_time={transit_time} />

					<div className={styles.port_code}>
						<div className={styles.port_label}>{destinationPortCode}</div>

						<div className={styles.date}>
							{formatDate({
								date       : arrival,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
								formatType : 'date',
							})}
						</div>
					</div>
				</div>

				<AmountDisplay
					rateObject={rateObject}
					conversions={conversions}
					currency={currency}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<ServiceIcon service={serviceDetail.service_type} />

			<div className={styles.service_type}>
				{formatSavedServicesInvoiceTo({ service: serviceDetail })}
			</div>

			<AmountDisplay
				rateObject={rateObject}
				conversions={conversions}
				currency={currency}
			/>
		</div>
	);
}

export default ServiceInfo;
