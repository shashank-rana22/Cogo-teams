import React from 'react';

import styles from './styles.module.css';

function MapTooltip({
	color = null,
	display_name = '',
	value = null,
	value_key = '',
	value_suffix = '%',
}) {
	return (
		<div className={styles.tooltip} style={{ borderColor: `${color || 'transparent'}` }}>
			<h3>{display_name}</h3>
			{value && (
				<h1>
					{`${value_key ? `${value_key} :` : ''} ${value} ${value ? value_suffix : ''}`}
				</h1>
			)}
		</div>
	);
}

export default MapTooltip;
