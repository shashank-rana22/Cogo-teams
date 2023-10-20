import { Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from '../styles.module.css';

function ViewRevertedRates({ revertedRateData = {} }) {
	const { min_price, currency, weight_slabs } = revertedRateData;

	const COLUMNS = [
		{ Header: 'Lower Limit', accessor: 'lower_limit' },
		{ Header: 'Upper Limit', accessor: 'upper_limit' },
		{ Header: 'Currency', accessor: 'currency' },
		{ Header: 'Price', accessor: 'tariff_price' },
		{ Header: 'Unit', accessor: 'unit' },
	];
	return (
		<div className={styles.pop_container}>
			<div className={styles.heading}>Reverted Rates</div>

			<div className={styles.item}>
				{min_price && (
					<div className={styles.pair_container}>
						<div className={styles.key}>Min Price :</div>

						<div className={styles.value}>
							{formatAmount({
								amount  : min_price,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 0,
								},
							})}
						</div>
					</div>
				)}

				<Table columns={COLUMNS} data={weight_slabs} />
			</div>
		</div>
	);
}

export default ViewRevertedRates;
