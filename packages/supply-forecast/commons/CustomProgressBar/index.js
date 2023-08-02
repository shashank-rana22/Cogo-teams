import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CustomProgressBar({
	id = '',
	className = '',
	style = {},
	progress = '',
}) {
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
				<div>90 TEU FULFILLED</div>
				<div>100 TEU ALLOCATED</div>

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
