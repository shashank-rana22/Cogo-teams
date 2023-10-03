import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const SHOW_LENGTH = 11;
const NO_PROFIT = 0;

export default function RenderTableData({ data = '', percent = '' }) {
	return (
		<div>
			<div className={styles.fix_layout}>
				{ShowOverflowingNumber(data, SHOW_LENGTH, 'INR') }
			</div>
			<div className={styles.flex}>
				<div className={percent >= NO_PROFIT ? styles.profit_icon : styles.loss_icon}>
					<IcMArrowNext height="20" width="20" />
				</div>
				<div>
					{percent >= NO_PROFIT ? `+${percent}%` : `${percent}%`}
				</div>
			</div>
		</div>
	);
}
