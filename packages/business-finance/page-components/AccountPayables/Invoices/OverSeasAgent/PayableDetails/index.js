import { Button, Pill } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PayabledDetails({ kycStatus = 'Verified' }) {
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div className={styles.display_name}>Name - Test_Business97274</div>
				<div className={styles.display_status}>
					<Pill>OVERSEAS AGENT</Pill>

					{kycStatus && (
						<div className={styles.verified}>
							<IcCFtick />

							<div>{kycStatus}</div>
						</div>
					)}
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.amount_container}>
				<div className={styles.amount}>
					Amount Payables :
					{' '}
					0
				</div>

				<div className={styles.amount}>
					Amount Receivables :
					{' '}
					0
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.btn_container}>
				<Button className={styles.btn} themeType="secondary">AGREEMENT</Button>

				<Button className={styles.btn} themeType="accent">OTHER DOCUMENTS </Button>
			</div>
		</div>
	);
}

export default PayabledDetails;
