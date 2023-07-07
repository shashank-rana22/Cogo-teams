import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function getInvoicingPartyPrice({
	serviceRates,
	invoiceServices,
	invoicingPartyCurrency,
	currencies,
	cogofx_currencies,
}) {
	let invoicingPartyPrice = 0;
	(Object.keys(serviceRates) || []).forEach((serviceRate) => {
		const serviceAmount = serviceRates[serviceRate].tax_total_price_discounted;
		if (!(invoiceServices || []).includes(serviceRate)) {
			return;
		}
		if (
			invoicingPartyCurrency
			=== serviceRates[serviceRate].tax_total_price_currency
		) {
			invoicingPartyPrice += serviceAmount;
		} else {
			const toBaseCurrency =				serviceAmount
				* (currencies[serviceRates[serviceRate].tax_total_price_currency]
					|| cogofx_currencies[
						serviceRates[serviceRate].tax_total_price_currency
					]);

			const toInvoiceCurrency =				toBaseCurrency
				/ (currencies[invoicingPartyCurrency]
					|| cogofx_currencies[invoicingPartyCurrency]);
			invoicingPartyPrice += toInvoiceCurrency;
		}
	});

	return invoicingPartyPrice;
}

function getTax(
	price,
	taxPercent,
	currencyConversionDelta,
	primaryServiceDetails,
	lineItemCurrency,
) {
	let tax = price * ((taxPercent / 100) + 1);

	if (primaryServiceDetails.tax_total_price_currency !== lineItemCurrency) {
		tax *= currencyConversionDelta + 1;
	}

	return tax;
}

function getExtraCharges({
	rate,
	invoicingPartyCurrency,
	currencies,
	currency_conversion_delta,
	primaryServiceDetails,
}) {
	let extraCharges = 0;
	const { booking_charges } = rate;
	(Object.keys(booking_charges) || []).forEach((charge) => {
		const lineItem = booking_charges[charge].line_items;
		let price = 0;
		if (invoicingPartyCurrency === lineItem[0].currency) {
			price = lineItem[0].total_price_discounted;
		} else {
			const toBaseCurrency =				lineItem[0].total_price_discounted * currencies[lineItem?.[0].currency];

			price = toBaseCurrency / currencies[invoicingPartyCurrency];
		}
		const tax = getTax(
			price,
			lineItem[0].tax_percent,
			currency_conversion_delta,
			primaryServiceDetails,
			lineItem[0].currency,
		);

		extraCharges += tax;
	});

	return extraCharges;
}

function TotalCost({ rate = {}, conversions = {}, invoicingParty = {}, detail = {} }) {
	const {
		cogofx_currencies = {},
		currencies = {},
		currency_conversion_delta,
	} = conversions || {};

	let invoicingPartyPrice = 0;

	const { services: serviceRates = {} } = rate || {};

	const { primary_service = '' } = detail;

	const { invoice_currency:invoicingPartyCurrency, services = [] } = invoicingParty;

	const invoiceServices = (services || []).map(
		(item) => item.service_id,
	);

	invoicingPartyPrice = getInvoicingPartyPrice({
		serviceRates,
		invoiceServices,
		invoicingPartyCurrency,
		currencies,
		cogofx_currencies,
	});

	const primaryServiceDetails = Object.values(serviceRates || []).find(
		(obj) => obj.service_type === primary_service,
	);

	const primaryServiceId = Object.keys(serviceRates || []).find(
		(key) => serviceRates[key] === primaryServiceDetails,
	);

	const servicesName = Object.values(serviceRates || {}).map(
		(obj) => obj.service_name,
	);

	let extraCharges = 0;
	if (
		servicesName.includes(detail.primary_service)
		&& invoiceServices.includes(primaryServiceId)
	) {
		extraCharges = getExtraCharges({
			rate,
			invoicingPartyCurrency,
			currencies,
			currency_conversion_delta,
			primaryServiceDetails,
		});
	}

	invoicingPartyPrice += extraCharges;

	const totalDisplayString = formatAmount({
		amount   : invoicingPartyPrice,
		currency : invoicingPartyCurrency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.text}>Total</div>

			<div className={styles.total_price}>
				{totalDisplayString}
			</div>
		</div>
	);
}

export default TotalCost;
