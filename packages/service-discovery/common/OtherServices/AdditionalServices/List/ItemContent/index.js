import { Table, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

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
					amount  : price || 0,
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
					amount  : total_price_discounted || 0,
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

function ItemContent({ serviceItem = {} }) {
	const { rateData = [], data } = serviceItem;

	const renderRateItem = (service) => {
		const {
			container_size = '',
			container_type = '',
			commodity = '',
			line_items = [],
			total_price_currency = '',
			total_price_discounted = 0,
			is_rate_available = false,
		} = service;

		return (
			<div className={styles.rate_item}>
				<div className={styles.header}>
					<span className={styles.pill}>
						{`${['20', '40'].includes(container_size) ? `${container_size}ft.`
							: container_size} ${startCase(container_type)} ${startCase(commodity)}`}
					</span>

					{is_rate_available ? (
						<div className={styles.total_price}>
							Total:
							<div style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
								{formatAmount({
									amount   : total_price_discounted,
									currency : total_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					) : (
						<div className={styles.no_rates_found}>
							<strong>No Rates Found</strong>

							<Button
								size="sm"
								themeType="accent"
								className={styles.request_rate_button}
							>
								Request Rate
							</Button>
						</div>
					)}
				</div>

				<div className={styles.line_items}>
					{!isEmpty(line_items) ? (
						<Table
							columns={getPriceBreakUpColumn}
							data={line_items}
						/>
					) : null}
				</div>

			</div>
		);
	};
	return (
		<div className={styles.container}>
			{rateData.map((rateItem) => {
				console.log('rateItem');
				const { dependent_service_id = '', id = '' } = rateItem;
				const details = data.find(
					(dataItem) => (dataItem.dependent_service_id === dependent_service_id || dataItem.id === id),
				);
				return renderRateItem(rateItem);
			})}
		</div>
	);
}

export default ItemContent;
