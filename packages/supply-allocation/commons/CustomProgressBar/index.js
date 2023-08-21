import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const COLORS_MAPPING = {
	current_container_allocation : '#DDEBC0',
	past_container_allocation    : '#E0E0E0',
};

const C = 100;

function CustomProgressBar({
	id = '',
	className = '',
	style = {},
	allocatedCount = 0,
	promisedCount = 0,
	view = '',
}) {
	const progress = (promisedCount / allocatedCount) * C;

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
					style={{ width: `${progress}%`, background: `${COLORS_MAPPING[view]}` }}
				/>
			</div>
		</div>

	);
}
export default CustomProgressBar;
