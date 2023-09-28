import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const SHOW_LENGTH = 11;

export default function RenderTableData({ data }) {
	return (
		<div>
			<div className={styles.fix_layout}>
				{ShowOverflowingNumber(data, SHOW_LENGTH, 'INR') }
			</div>
			<div className={styles.flex}>
				<div className={styles.profit_icon}>
					<IcMArrowNext height="20" width="20" />
				</div>
				{/* <div className={styles.loss_icon}>
        <IcMArrowNext height="16" width="16" />
    </div> */}
				<div>
					+ 100%
				</div>
			</div>
		</div>
	);
}
