import { cl } from '@cogoport/components';
import React from 'react';

import PercentageChange from '../PercentageChange';

import styles from './styles.module.css';

function AccountTypeWise({
	label = '',
	dataValue = 0,
	change = 0,
	segregated = false,
	decimalNotRequired = false,
}) {
	return (
		<div
			className={cl`${styles.component} ${segregated ? styles.segregated_component : ''}`}
		>
			<div
				className={cl`${styles.label} ${cl.ns('label_type')}`}
			>
				{label || ''}
			</div>

			<div
				className={styles.total_value}
				style={{ fontSize: segregated ? '13px' : '26px' }}
			>
				{decimalNotRequired ? dataValue : dataValue?.toFixed(2)}
			</div>

			<PercentageChange
				percentageChanged={change}
			/>
		</div>
	);
}

export default AccountTypeWise;
