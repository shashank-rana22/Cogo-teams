import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const SHOW_LENGTH = 11;
const NO_PROFIT = 0;

function checkProfitLoss(profit = 0, category = '') {
	if (profit >= NO_PROFIT) {
		if (category === 'BUY') {
			return false;
		}
		return true;
	}

	if (category === 'BUY') {
		return true;
	}
	return false;
}

export default function RenderTableData({ data = 0, profit = 0, category = '', currency = '' }) {
	const absoluteProfit = Math.abs(profit || NO_PROFIT);
	return (
		<div>
			<div className={styles.fix_layout}>

				{category === 'Profitability' ? `${data}%` : ShowOverflowingNumber(data, SHOW_LENGTH, currency) }
			</div>
			<div className={styles.flex}>
				<div className={checkProfitLoss(profit, category) ? styles.profit_icon : styles.loss_icon}>
					<IcMArrowNext height="20" width="20" />
				</div>
				<div>
					{`${absoluteProfit}${category !== 'Profitability' ? '%' : ''}`}
				</div>
			</div>
		</div>
	);
}
