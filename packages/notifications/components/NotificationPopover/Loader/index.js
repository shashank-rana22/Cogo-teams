import { IcMRadioLoader } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function LoaderComp() {
	return (
		<div className={styles.container}>
			<div className={styles.loader}>
				<IcMRadioLoader />
			</div>
			<div className={styles.load_heading}>Loading...</div>
		</div>
	);
}
export default LoaderComp;
