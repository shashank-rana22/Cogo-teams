import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import { convertCurrencyValue } from '../../../../../../../../helpers/dynamic-values';
import ServiceIcon from '../../../../../../commons/ServiceIcon';

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
	return (
		<div className={styles.container}>
			<div className={styles.service_type}>
				<ServiceIcon service={serviceDetail.service_type} />

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
