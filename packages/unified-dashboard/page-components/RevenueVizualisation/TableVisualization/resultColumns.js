import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

const getAmount = (amount) => formatAmount({
	amount   : amount || 0,
	currency : GLOBAL_CONSTANTS.currency_code.USD,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		notation              : 'compact',
		compactDisplay        : 'short',
		minimumFractionDigits : 2,
	},
});

function ResultColumns({ columns = [] }) {
	return useMemo(
		() => columns.map((column, index) => ({
			Header   : <div className={styles.head}>{startCase(column)}</div>,
			accessor : (item) => {
				if (column === 'organization_name') {
					return (
						<Tooltip content={item?.[`${column}`]} animation="shift-toward">
							<div>
								<div className={styles.data}>{startCase(item?.[`${column}`])}</div>
							</div>
						</Tooltip>
					);
				}

				if (column === 'percent_profit') {
					return (
						<div className={styles.data}>
							{Number(item?.[`${column}`]).toFixed(2)}
							%
						</div>
					);
				}

				if (typeof item?.[`${column}`] === 'number') {
					return <div className={styles.data}>{getAmount(item?.[`${column}`])}</div>;
				}

				return <div className={styles.data}>{startCase(item?.[`${column}`])}</div>;
			},
			key : column,
			id  : `${column}${index}`,
		})),
		[columns],
	);
}

export default ResultColumns;
