import React from 'react';

import Top1 from './components/Top1';
import VendorInfo from './components/VendorInfo';
import Verified from './components/Verified';
import styles from './styles.module.css';
// import styles from './styles.module.css';

export function Profile({ data = {} }) {
	return (
		<div className={styles.padd}>
			<div className={styles.main}>
				<Top1 />
				<Verified data={data} />
				<VendorInfo data={data} />

			</div>
		</div>
	);
}
