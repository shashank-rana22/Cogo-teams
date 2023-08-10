import { cl } from '@cogoport/components';
import { IcCGreenCircle, IcCCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function VerticleLine({ checked = true, isLast = false }) {
	return (
		<div className={styles.OuterDiv}>
			<div className={cl`${styles.Circle} ${checked ? styles.checked : styles.unchecked}`}>
				{checked ? <IcCGreenCircle /> : <IcCCircle />}
			</div>
			{!isLast
			&& <div className={cl`${styles.Line} ${checked ? styles.checked : styles.unchecked}`} />}
		</div>
	);
}

export default VerticleLine;
