import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import { PercentageChange } from '../../../../common/Elements';

import styles from './styles.module.css';
import TooltipContent from './tooltipContent';

function DataComponent({
	label = '',
	dataValue = '',
	change = 0,
	segregated = false,
	title = '',
}) {
	return (
		<div
			className={cl`${styles.component} ${segregated ? styles.segregated_component : ''}`}
		>
			<div
				className={styles.label}
				style={{ fontSize: segregated ? '11px' : '14px' }}
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
				style={{ fontSize: segregated ? '12px' : '26px' }}
			>
				{dataValue?.toFixed(2)}
			</div>

			<PercentageChange
				percentageChanged={change?.toFixed(1)}
			/>
		</div>
	);
}

export default DataComponent;
