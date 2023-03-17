import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function AccountPayablesByService() {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.heading}>
					Account Payables By Service
				</div>
				<div className={styles.hr} />
				<div className={styles.amount_container}>
					<div className={styles.amount}>
						<div className={styles.label}>
							Ocean
						</div>
						<div className={styles.value}>
							INR 44000K
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Air
						</div>
						<div className={styles.value}>
							INR 2100K
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Surface
						</div>
						<div className={styles.value}>
							INR 2350K
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Overseas
						</div>
						<div className={styles.value}>
							INR 1200K
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.label}>
							Overheads
						</div>
						<div className={styles.value}>
							INR 600K
						</div>
					</div>
				</div>

			</div>
			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					// onClick={() => handleClick()}
					role="presentation"
				>
					Show more
					<IcMArrowDown height={15} width={15} className={styles.down} />
				</div>
			</div>
		</div>
	);
}

export default AccountPayablesByService;
