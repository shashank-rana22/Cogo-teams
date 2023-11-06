import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import PercentageChange from '../PercentageChange';

import styles from './styles.module.css';
import TooltipContent from './tooltipContent';

function AccountTypeWise({
	label = '',
	dataValue = 0,
	change = 0,
	segregated = false,
	title = '',
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

				{title === 'bookings' ? (
					<Tooltip
						placement="bottom-end"
						content={<TooltipContent />}
						className={styles.tooltip}
					>
						<IcMInfo />
					</Tooltip>
				) : null}
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
