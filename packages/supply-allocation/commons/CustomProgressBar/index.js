import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CustomProgressBar({
	id = '',
	className = '',
	style = {},
	allocatedCount = 0,
	promisedCount = 0,
}) {
	const progress = (promisedCount / allocatedCount) * 100;
	return (
		<div
			id={id}
			className={cl`
			${className}
			${styles.container}
			${cl.ns('progressbar_container')}`}
			style={style}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					{promisedCount}
					{' '}
					TEU ALLOCATED
				</div>

				<div>
					{allocatedCount}
					{' '}
					TEU FULFILLED
				</div>

			</div>
			<div className={cl`
				${styles.progress_bar}
				${cl.ns('progressbar_bar')}`}
			>
				<div
					className={cl`
						${styles.progress} 
						${cl.ns('progressbar_progress')}`}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>

	);
}
export default CustomProgressBar;
