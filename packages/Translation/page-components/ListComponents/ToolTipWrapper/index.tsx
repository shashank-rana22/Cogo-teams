import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ToolTipWrapper({ text }: { text: string }) {
	const render = text?.length > 100;
	return (
		render ? (
			<Tooltip
				placement="right"
				trigger="mouseenter"
				interactive
				content={text}
			>
				<div className={styles.para}>
					{text?.slice(0, 80)}
					.....
				</div>
			</Tooltip>
		) : <div>{text}</div>
	);
}

export default ToolTipWrapper;
