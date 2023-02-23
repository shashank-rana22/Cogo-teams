import React from 'react';

import Top1 from './components/Top1';
import VendorInfo from './components/VendorInfo';
import Verified from './components/Verified';
import styles from './styles.module.css';
// import styles from './styles.module.css';

function Profile({ data = {}, refetchVendorInfo = () => {} }) {
	return (
		<div className={styles.padd}>
			<div className={styles.main}>
				<Top1 vendor_details={data?.vendor_details} refetchVendorInfo={refetchVendorInfo} />
				<Verified data={data} />
				<VendorInfo data={data} refetchVendorInfo={refetchVendorInfo} />

			</div>
		</div>
	);
}

export default Profile;
