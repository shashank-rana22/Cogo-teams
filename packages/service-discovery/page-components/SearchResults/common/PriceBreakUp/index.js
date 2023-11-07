import { Table, Pill, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getDetails from './getDetails';
import LineItem from './LineItem';
import styles from './styles.module.css';

const SUBSIDIARY_SERVICES = ['EDE', 'EDT', 'DET', 'DEA'];

const POSITIVE_VALUE = 1;
const NEGATIVE_VALUE = -1;
const DEFAULT_VALUE = 0;

const TRADE_TYPE_MAPPING = {
	export : 'Origin',
	import : 'Destination',
};

const getPriceBreakUpColumn = [
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Service name</div>,
		id       : 'service_name',
		accessor : ({ name = '' }) => (
			<div className={styles.column}>{startCase(name)}</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Original Price</div>,
		id       : 'price',
		accessor : (lineItem) => (
			<div className={styles.column} style={{ fontSize: 12, fontWeight: 600 }}>
				<LineItem lineItem={lineItem} />
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Unit</div>,
		id       : 'unit',
		accessor : ({ unit = '' }) => (
			<div className={styles.column}>
				{startCase(unit)}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>QTY.</div>,
		id       : 'quantity',
		accessor : ({ quantity = '' }) => (
			<div className={styles.column}>
				{quantity}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 600 }}>Final Price</div>,
		id       : 'total_price_discounted',
		accessor : ({ total_price_discounted = 0, currency = '' }) => (
			<div className={styles.column} style={{ fontSize: 12, fontWeight: 600 }}>
				{formatAmount({
					amount  : total_price_discounted,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
];

const handleServicesNames = (item) => {
	const { trade_type = '', service_type = '', code = '', service_name = '' } = item || {};

	const isDnd = SUBSIDIARY_SERVICES.includes(code);

	const formattedTradeType = TRADE_TYPE_MAPPING[trade_type] || '';
	const formattedService = startCase(service_type);
	const formattedSubsidiaryServiceName = startCase(service_name);

	if (isDnd) {
		return formattedSubsidiaryServiceName;
	}

	if (['cargo_insurance', 'warehouse'].includes(service_type)) {
		return formattedService;
	}

	if (code) {
		return `${formattedTradeType} ${formattedSubsidiaryServiceName}`;
	}

	return `${formattedTradeType} ${formattedService}`;
};

function IndividualPriceBreakup({ service = {}, restServiceDetail = {} }) {
	const {
		line_items = [],
		is_rate_available:isRateAvailabe,
	} = service;

	const containerDetail = getDetails({ service: service?.service_type, item: restServiceDetail });

	let text = 'No Rates';

	if (!isRateAvailabe) {
		if (['fcl_freight_local', 'air_freight_local'].includes(service.service_type)) {
			if (service.source !== 'cogo_assured_rate') {
				text = 'At Actuals';
			}
		}
	}

	return (
		<>
			<div className={styles.service_div}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<span className={styles.service}>{handleServicesNames(service)}</span>

					{containerDetail.map((item) => (
						<Pill
							key={item}
							size="md"
							style={{ border: '1px solid #24C7D9', background: '#ffffff' }}
							className={styles.service_info_pill}
						>
							{item}
						</Pill>
					))}

					{!isRateAvailabe ? (
						<Tooltip
							placement="top"
							trigger="mouseenter"
							interactive
							content={<span>Rate not available</span>}
						>
							<IcMInfo className={styles.info_icon} />
						</Tooltip>
					) : null}
				</div>

				{!isRateAvailabe ? (
					<span className={styles.service}>
						{text}
					</span>
				) : null}
			</div>

			{isRateAvailabe ? (
				<div className={styles.table}>
					<Table
						className={styles.table_container}
						columns={getPriceBreakUpColumn}
						data={line_items}
					/>
				</div>
			) : null}
		</>
	);
}

function PriceBreakup({ rateCardData = {}, detail = {} }) {
	const { service_rates, total_price_discounted = 0, total_price_currency = '' } = rateCardData;
	const { service_details, service_type } = detail;

	const updatedServiceRates = useMemo(
		() => Object.entries(service_rates || {})
			.map(([key, value]) => ({ ...value, key }))
			.sort(
				(
					{
						trade_type: firstElementTradeType = '',
						service_type: firstElementServiceType,
					},
					{
						trade_type: secondElementTradeType = '',
						service_type: secondElementServiceType,
					},
				) => {
					const tradeTypeOrder = ['export', 'main', 'import', 'other'];

					let firstElementFinalTradeType = firstElementServiceType === service_type
						? 'main'
						: firstElementTradeType;

					let secondElementFinalTradeType = secondElementServiceType === service_type
						? 'main'
						: secondElementTradeType;

					if (['subsidiary', 'cargo_insurance', 'warehouse'].includes(firstElementServiceType)) {
						firstElementFinalTradeType = 'other';
					}

					if (['subsidiary', 'cargo_insurance', 'warehouse'].includes(secondElementServiceType)) {
						secondElementFinalTradeType = 'other';
					}

					if (
						tradeTypeOrder.findIndex(
							(item) => firstElementFinalTradeType === item,
						)
							> tradeTypeOrder.findIndex(
								(item) => secondElementFinalTradeType === item,
							)
					) {
						return POSITIVE_VALUE;
					}

					if (
						tradeTypeOrder.findIndex(
							(item) => firstElementFinalTradeType === item,
						)
							< tradeTypeOrder.findIndex(
								(item) => secondElementFinalTradeType === item,
							)
					) {
						return NEGATIVE_VALUE;
					}

					return DEFAULT_VALUE;
				},
			),
		[service_type, service_rates],
	);

	return (
		<div className={styles.container}>
			{updatedServiceRates.map(({ key, ...value }) => (
				<IndividualPriceBreakup
					key={key}
					service={value}
					service_type={service_type}
					restServiceDetail={service_details[key]}
				/>
			))}

			<div className={styles.total_price}>
				Total:
				<div style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
					{formatAmount({
						amount   : total_price_discounted,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default PriceBreakup;
