import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function VerticleLine({ checked, isLast, zIndex }) {
	return (
		<div className={styles.container}>
			<div className={` ${checked ? styles.checked_circle : styles.circle}`} style={{ zIndex }}>
				{checked ? <IcMTick /> : null}
			</div>
			{!isLast && (
				<div
					style={{ zIndex }}
					className={`${checked ? styles.checked_line : styles.line}`}
				/>
			)}
		</div>
	);
}

export default VerticleLine;
