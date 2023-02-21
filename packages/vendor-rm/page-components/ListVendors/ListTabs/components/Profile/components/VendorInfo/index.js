/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-constant-condition */
import { Button } from '@cogoport/components';
import React from 'react';

import PaymentDetails from './components/PaymentDetails';
import VendorDetailsInfo from './components/VendorDetailsInfo';
import VendorServices from './components/VendorServices';
import styles from './styles.module.css';

function VendorInfo({ data = {} }) {
	return (
		<div className={styles.main}>
			<span className={styles.heading}>Vendor Details </span>

			<VendorDetailsInfo data={data} />

			<hr className={styles.dis} />

			<span className={styles.heading}>Vendor Services</span>
			<VendorServices data={data} />
			<hr className={styles.dis} />
			<span className={styles.heading}>Payment Details</span>

			<PaymentDetails data={data} />

			<Button size="md" themeType="secondary">Add Bank Account</Button>
		</div>
	);
}

export default VendorInfo;
