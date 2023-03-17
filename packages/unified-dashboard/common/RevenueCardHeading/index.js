import { Tooltip } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMInfo,
	IcMUpwardGraph,
} from '@cogoport/icons-react';
import React from 'react';

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
					<IcMUpwardGraph className={styles.revenue} />
				)}
				<div className={styles.text_title}>
					{title}
				</div>

				{enableFilter && (
					<Tooltip
						placement="top"
						content={<i>{toolTipContent}</i>}
						maxWidth={500}
					>
						<div className={styles.flex_info}>
							<IcMInfo className={styles.info} />
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
