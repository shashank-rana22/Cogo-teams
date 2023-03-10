import { Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

import Info from '../../Icons/info.svg';
import Revenue from '../../Icons/revenue.svg';

import styles from './styles.module.css';

function RevenueCardHeading({
	showIcon = Boolean,
	title = '',
	toolTipContent = '',
	enableFilter = true,
	showCollapse = false,
	setIsCollapsed = () => {},
	isCollapsed = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.revenue_container}>
				{showIcon && (
					<Revenue className={styles.revenue} />
				)}
				<div className={styles.text_title}>
					{title}
				</div>

				{enableFilter && (
					<Tooltip
						placement="top"
						// animation="shift-toward"
						content={<i>{toolTipContent}</i>}
						maxWidth={500}
					>
						<div className={styles.flex_info}>
							<Info className={styles.info} />
						</div>
					</Tooltip>
				)}
			</div>

			{showCollapse && (
				<div className={styles.collapse_container}>
					<div className={styles.flex_container} role="button" tabIndex="0" onClick={() => setIsCollapsed()}>
						<IcMArrowRotateDown
							className={styles.collapse_icon`{${isCollapsed ? 'active' : 'inactive'}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default RevenueCardHeading;
