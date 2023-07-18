import React from 'react';

import styles from './styles.module.css';

function flattenArray(arr) {
	return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten)
		? flattenArray(toFlatten) : toFlatten), []);
}

const COMPARISON_KEY = {
	guranteed_booking      : 'Guranteed booking',
	total_discounted_price : 'Total Landed Cost',
	free_origin_days       : 'Free days At Origin',
	free_detention_days    : 'Free days At Detention',
};

function MyTable({ comparisonKey, allLineItems }) {
	return (
		<div className={styles.table}>
			<div className={styles.tableHeader}>
				<div className={styles.column} />
				{allLineItems.map((item) => (
					<div key={item} className={styles.column}>{Object.keys(item)}</div>
				))}

			</div>
			<div className={styles.tableBody}>
				{Object.entries(comparisonKey).reverse().map(([key, value], index) => (
					<div
						key={key}
						className={`${styles.row} ${index % 2 === 0 ? styles.even : styles.odd}`}
					>
						<div className={styles.column}>{value}</div>
						<div className={styles.column}>row.column2</div>
						<div className={styles.column}>row.column3</div>
					</div>
				))}
			</div>
		</div>
	);
}

function ComparisonTable({ rateCardsForComparison = [] }) {
	const allLineItems = rateCardsForComparison.map((item) => {
		const { service_rates, shipping_line = {} } = item;
		const lineItems = Object.values(service_rates).map(((service) => service.line_items));

		const flattenedArraylineItems = flattenArray(lineItems);

		return {
			[shipping_line.short_name]: flattenedArraylineItems,
		};
	});

	allLineItems.forEach((obj) => {
		Object.values(obj).forEach((arr) => {
			arr.forEach((item) => {
				COMPARISON_KEY[item.code] = item.name;
			});
		});
	});

	console.log('allLineItems', allLineItems);

	return (
		<div className={styles.container}>
			<MyTable comparisonKey={COMPARISON_KEY} allLineItems={allLineItems} />
		</div>
	);
}

export default ComparisonTable;
