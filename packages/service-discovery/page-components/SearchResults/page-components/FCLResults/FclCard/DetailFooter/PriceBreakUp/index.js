import { Table, Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getDetails from './getDetails';
import styles from './styles.module.css';

const SUBSIDIARY_SERVICES = ['EDE', 'EDT', 'DET', 'DEA'];

const ZERO = 0;

const getPriceBreakUpColumn = [
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Service name</div>,
		id       : 'service_name',
		accessor : ({ name = '' }) => (
			<div className={styles.service_name}>{startCase(name)}</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Currency</div>,
		id       : 'currency',
		accessor : ({ currency = '' }) => (
			<div>
				{currency}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Original Price</div>,
		id       : 'price',
		accessor : ({ price = '', currency }) => (
			<div style={{ fontSize: 10, fontWeight: 600 }}>
				{formatAmount({
					amount  : price || ZERO,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>Unit</div>,
		id       : 'unit',
		accessor : ({ unit = '' }) => (
			<div>
				{startCase(unit)}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 500 }}>QTY.</div>,
		id       : 'quantity',
		accessor : ({ quantity = '' }) => (
			<div>
				{quantity}
			</div>
		),
	},
	{
		Header   : <div style={{ fontSize: 10, fontWeight: 600 }}>Final Price</div>,
		id       : 'total_price_discounted',
		accessor : ({ total_price_discounted = '', currency = '' }) => (
			<div style={{ fontSize: 12, fontWeight: 600 }}>
				{formatAmount({
					amount  : total_price_discounted || ZERO,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		),
	},
];

const handleServicesNames = (item) => {
	const serviceObj = { ...item };
	const tradeType = serviceObj?.trade_type;
	const service = serviceObj?.service_type;
	const isSubsidiaryService = serviceObj?.code || SUBSIDIARY_SERVICES.includes(serviceObj?.code);

	const TRADE_TYPE_MAPPING = {
		export : 'Origin',
		import : 'Destination',
	};

	const formattedTradeType = TRADE_TYPE_MAPPING[tradeType] || '';
	const formattedService = startCase(service);
	const formattedSubsidiaryServiceName = startCase(serviceObj?.service_name);

	return isSubsidiaryService ? `${formattedTradeType} ${formattedSubsidiaryServiceName}`
		: `${formattedTradeType} ${formattedService}`;
};

function PriceBreakup({ rateCardData, detail }) {
	const { service_rates, total_price_discounted = '', total_price_currency = '' } = rateCardData;
	const { service_details, service_type } = detail;

	const getIndividualPriceBreakup = ({ service, restServiceDetail }) => {
		const {
			line_items = [],
		} = service;

		const containerDetail = getDetails({ primary_service: service_type, item: restServiceDetail });

		return (
			<>
				<div className={styles.service_div}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<span className={styles.service}>{handleServicesNames(service)}</span>

						{(containerDetail || []).map((item) => (
							<Pill
								key={item}
								size="md"
								style={{ border: '1px solid #24C7D9', background: '#ffffff' }}
							>
								{item}
							</Pill>
						))}

					</div>
					{isEmpty(line_items) ? (
						<span className={styles.service}>
							No Rates
						</span>
					) : null}

				</div>
				{!isEmpty(line_items) ? (
					<div>
						<Table
							className={styles.table_container}
							columns={getPriceBreakUpColumn}
							data={line_items}
						/>
					</div>
				) : null}

			</>
		);
	};

	return (
		<div className={styles.container}>
			{Object.entries(service_rates).map(([key, value]) => getIndividualPriceBreakup({
				service           : value,
				restServiceDetail : service_details[key],
			}))}
			<div className={styles.total_price}>
				Total:
				<div style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
					{formatAmount({
						amount   : total_price_discounted || ZERO,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default PriceBreakup;
