/* eslint-disable react/jsx-key */
import React from 'react';

import styles from './styles.module.css';

function RenderSubContent({
	data = [],
	wdth = '',
	title = '',
}) {
	return (
		<div className={styles.sub_content} style={{ width: wdth }}>
			<div className={styles.light}>{title}</div>
			{data.map((item) => (
				<div className={styles.actual_content}>{item || '-'}</div>
			))}
		</div>
	);
}

export default RenderSubContent;
