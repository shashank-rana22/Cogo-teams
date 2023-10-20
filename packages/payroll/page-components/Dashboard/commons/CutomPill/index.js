import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function CustomPill({ background = '', color = '', text = '' }) {
	return (
		<div className={styles.outer_section} style={{ background }}>
			<span style={{ color }}>{startCase(text)}</span>
		</div>
	);
}
export default CustomPill;
