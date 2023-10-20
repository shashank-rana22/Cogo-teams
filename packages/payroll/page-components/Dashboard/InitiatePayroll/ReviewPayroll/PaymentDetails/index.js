import React from 'react';

import styles from './styles.module.css';

const PAYMENTDETAILS = [
	{ title: 'Total Net Wages', label: 'total_net_payout' },
	{ title: 'Total Deductions', label: 'total_deductions' },
	{ title: 'Total Reimbursements', label: 'total_reimbursements' },
];
const PAYROLLIMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/payroll_image.svg';
function PaymentDetails({
	payroll_data = {}, handledownload = () => {},
}) {
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<span className={styles.heading}>Payment Details</span>
				{
					PAYMENTDETAILS.map((item) => (
						<div key={item.name} className={styles.table_row}>
							<span className={styles.table_head}>{item.title}</span>
							<span className={styles.table_amount}>{payroll_data[item.label]}</span>
						</div>
					))
				}
				<div className={styles.divider} />
				<div className={styles.table_row}>
					<span className={styles.table_head}>Total Payroll</span>
					<span className={styles.table_amount2}>
						₹
						{' '}
						{payroll_data.total_payout}
					</span>
				</div>

			</div>
			<div className={styles.container_2}>
				<img
					src={PAYROLLIMAGE}
					alt="payroll-design"
				/>
				<span className={styles.text}>Run Payroll Summary</span>
				<span
					className={styles.underline_text}
					aria-hidden
					onClick={handledownload}
				>
					View Full Summary

				</span>
			</div>
		</div>

	);
}

export default PaymentDetails;
