import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function RelatedLinks() {
	const router = useRouter();

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				<span className={styles.upper_heading1}>Related Links</span>
				<span className={styles.lower_heading}>
					Related links you might be looking for
				</span>
			</div>

			<div className={styles.card_body}>
				<div
					className={styles.card_content}
					aria-hidden
					onClick={() => router.push('/payroll/manage?type=irregular_payments')}
				>
					<div className={styles.heading}>
						<div className={styles.upper_heading}>Irregular Payments</div>
						<div className={styles.lower_heading}>Pay employees quickly</div>
					</div>
					<div className={styles.arrow}><IcMArrowRight width={20} height={20} /></div>
				</div>
				<div
					aria-hidden
					className={styles.card_content}
					onClick={() => router.push('/payroll/manage?type=bonuses')}
				>
					<div className={styles.heading}>
						<div className={styles.upper_heading}>Bonus</div>
						<div className={styles.lower_heading}>Manage employee bonus</div>
					</div>
					<div className={styles.arrow}><IcMArrowRight width={20} height={20} /></div>
				</div>
			</div>
		</div>

	);
}

export default RelatedLinks;
