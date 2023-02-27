import React from 'react';

import Heading from './components/Heading';
import VendorInfo from './components/VendorInfo';
import Verified from './components/Verified';
import styles from './styles.module.css';

function Profile({
	data = {},
	refetchVendorInfo = () => {},
}) {
	return (
		<div className={styles.padd}>
			<div className={styles.main}>

				<Heading
					vendor_details={data.vendor_details}
					refetchVendorInfo={refetchVendorInfo}
					data={data}
				/>

				<Verified
					vendor_details={data.vendor_details}
				/>

				<VendorInfo
					data={data}
					refetchVendorInfo={refetchVendorInfo}
				/>
			</div>
		</div>
	);
}

export default Profile;
