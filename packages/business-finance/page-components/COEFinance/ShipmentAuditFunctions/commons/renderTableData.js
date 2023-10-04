import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const SHOW_LENGTH = 11;
const NO_PROFIT = 0;

function check(profit = 0, category = '') {
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

export default function RenderTableData({ data = 0, profit = 0, category = '' }) {
	const absoluteProfit = Math.abs(profit);
	return (
		<div>
			<div className={styles.fix_layout}>
				{ShowOverflowingNumber(data, SHOW_LENGTH, 'INR') }
			</div>
			<div className={styles.flex}>
				<div className={check(profit, category) ? styles.profit_icon : styles.loss_icon}>
					<IcMArrowNext height="20" width="20" />
				</div>
				<div>
					{`${absoluteProfit}%`}
				</div>
			</div>
		</div>
	);
}
