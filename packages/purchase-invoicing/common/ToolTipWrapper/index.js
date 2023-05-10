import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ToolTipWrapper({
	text = '',
	maxlength = 25,
	content,
	children,
	render,
}) {
	const renderToolTip = text.length > maxlength;

	return (
		<div>
			{(render || renderToolTip) ? (
				<Tooltip
					placement="bottom"
					content={content || <span className={styles.contenttext}>{text}</span>}
					interactive={false}
				>
					<span>{render ? children : `${text.slice(0, maxlength)}...`}</span>
				</Tooltip>
			) : children || text}
		</div>
	);
}

export default ToolTipWrapper;
