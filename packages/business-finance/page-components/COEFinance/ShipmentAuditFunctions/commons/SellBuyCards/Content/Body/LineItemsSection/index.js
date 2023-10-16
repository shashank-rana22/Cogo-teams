import React from 'react';

import RenderSubContent from './RenderSubContent';
import styles from './styles.module.css';

function LineItemsSection({
	lineItems = [],
}) {
	const {
		names, quantities, units, currencies, prices, margins,
		exchange_rates, tax_price, total_prices,
	} = (lineItems || []).reduce(
		(acc, item) => {
			acc.names.push(item.name);
			acc.quantities.push(item.quantity);
			acc.units.push(item.unit);
			acc.currencies.push(item.currency);
			acc.prices.push(item.price);
			acc.margins.push(item.margins);
			acc.exchange_rates.push(item.exchange_rate);
			acc.tax_price.push(item.tax_price);
			acc.total_prices.push(item.total_price);
			return acc;
		},
		{
			names          : [],
			quantities     : [],
			units          : [],
			currencies     : [],
			prices         : [],
			margins        : [],
			exchange_rates : [],
			tax_price      : [],
			total_prices   : [],
		},
	);

	return (
		<div className={styles.main_content}>
			<RenderSubContent data={names} wdth="15%" title="Name" />

			<RenderSubContent data={quantities} wdth="10%" title="Qty" />

			<RenderSubContent data={units} wdth="10%" title="Unit" />

			<RenderSubContent data={currencies} wdth="10%" title="Curr" />

			<RenderSubContent data={prices} wdth="10%" title="Price" />

			<RenderSubContent data={margins} wdth="15%" title="Margin" />

			<RenderSubContent data={exchange_rates} wdth="15%" title="Ex. Rate" />

			<RenderSubContent data={tax_price} wdth="10%" title="Tax" />

			<RenderSubContent data={total_prices} wdth="10%" title="Total" />
		</div>
	);
}

export default LineItemsSection;
