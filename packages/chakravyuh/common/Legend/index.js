import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CustomLegend({ className = '', items = [] }) {
	return (
		<div className={cl`${styles.container} ${className}`}>
			{items.map(({ label, spectrumStyle, key }) => (
				<div className={styles.legend_item} key={key}>
					<div style={spectrumStyle} />
					<p>{label}</p>
				</div>
			))}
		</div>
	);
}

export default CustomLegend;
