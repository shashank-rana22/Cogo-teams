import { Tooltip } from '@cogoport/components';
import {
	IcMInfo,
	IcMArrowRotateDown,
	IcMUpwardGraph,
} from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function AnalysisCardHeaders({
	title,
	toolTipContent,
	setIsCollapsed,
	isCollapsed,
}) {
	return (
		<div className={styles.container} role="button" tabIndex={0} onClick={() => setIsCollapsed()}>
			<div className={styles.title_container}>
				<IcMUpwardGraph />
				<div className={styles.title}>
					{title}
				</div>

				<Tooltip
					placement="top"
					content={<i>{toolTipContent}</i>}
				>
					<div className={styles.title_container}>
						<IcMInfo />
					</div>
				</Tooltip>
			</div>

			<IcMArrowRotateDown
				className={isCollapsed ? `${styles.collapse_icon_active}`
					: `${styles.collapse_icon_inactive}`}
			/>
		</div>
	);
}

export default AnalysisCardHeaders;
