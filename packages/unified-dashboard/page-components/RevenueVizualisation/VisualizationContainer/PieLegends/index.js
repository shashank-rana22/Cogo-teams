import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import colors from '../../../../utils/pieColors';

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

function PieLegends({ data = [] }) {
	return (
		<div className={styles.main_container}>
			{data.map((val, index) => (
				<div className={styles.container} key={colors[index]}>
					<div className={styles.color_box} style={{ backgroundColor: colors[index] }} />
					<div className={styles.amount_text}>
						{startCase(val.label)}
						{' '}
						(
						{getAmount(val.value)}
						)
					</div>
				</div>
			))}
		</div>
	);
}

export default PieLegends;
