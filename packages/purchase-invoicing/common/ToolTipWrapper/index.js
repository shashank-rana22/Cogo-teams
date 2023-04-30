import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ToolTipWrapper({ text = '', maxlength = 25, content, children }) {
	const renderToolTip = text.length > maxlength;

	return (
		<div>
			{renderToolTip ? (
				<Tooltip
					placement="bottom"
					content={content || <span className={styles.contenttext}>{text}</span>}
					interactive={false}
				>
					<span>{`${text.slice(0, maxlength)}...`}</span>
				</Tooltip>
			) : children || text}
		</div>
	);
}

export default ToolTipWrapper;
