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

	const subContentData = [
		{ data: names, wdth: '15%', title: 'Name' },
		{ data: quantities, wdth: '10%', title: 'Qty' },
		{ data: units, wdth: '10%', title: 'Unit' },
		{ data: currencies, wdth: '10%', title: 'Curr' },
		{ data: prices, wdth: '10%', title: 'Price' },
		{ data: margins, wdth: '15%', title: 'Margin' },
		{ data: exchange_rates, wdth: '15%', title: 'Ex. Rate' },
		{ data: tax_price, wdth: '10%', title: 'Tax' },
		{ data: total_prices, wdth: '10%', title: 'Total' },
	];

	return (
		<div className={styles.main_content}>
			{subContentData.map((item) => (
				<RenderSubContent key={item.title} data={item.data} wdth={item.wdth} title={item.title} />
			))}
		</div>
	);
}

export default LineItemsSection;
