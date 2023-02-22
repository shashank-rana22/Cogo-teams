import React from 'react';

import Top1 from './components/Top1';
import VendorInfo from './components/VendorInfo';
import Verified from './components/Verified';
import styles from './styles.module.css';
// import styles from './styles.module.css';

function Profile({ data = {} }) {
	return (
		<div className={styles.padd}>
			<div className={styles.main}>
				<Top1 vendor_details={data?.vendor_details} />
				<Verified data={data} />
				<VendorInfo data={data} />

			</div>
		</div>
	);
}

export default Profile;
