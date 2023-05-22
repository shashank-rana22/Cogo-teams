import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function BankDetails({ bank_details }) {
	const bankDetails = {
		ifsc_code           : 'ACHDGE1234',
		account_holder_name : 'Prachi Dewangan',
		bank_name           : 'SBI',
		branch_name         : 'NIT Raipur',
		bank_account_number : '652873687254827',
	};
	return (
		<div className={styles.container}>
			<div className={styles.top_bar}>
				<div>
					<div className={styles.label}>
						Bank Name
					</div>
					<div className={styles.value}>
						{bankDetails?.bank_name}
					</div>
				</div>

				<div>
					<div className={styles.label}>
						Branch Name
					</div>
					<div className={styles.value}>
						{bankDetails?.branch_name}
					</div>
				</div>

				<div>
					<div className={styles.label}>
						Ifsc Code
					</div>
					<div className={styles.value}>
						{bankDetails?.ifsc_code}
					</div>
				</div>

				<div>
					<div className={styles.label}>
						Account Holder Name
					</div>
					<div className={styles.value}>
						{bankDetails?.account_holder_name}
					</div>
				</div>

				<div>
					<div className={styles.label}>
						Bank Account Number
					</div>
					<div className={styles.value}>
						{bankDetails?.bank_account_number}
					</div>
				</div>
			</div>

			<div className={styles.cancelled_cheque}>
				<div className={styles.label}>
					Cancelled Cheque
				</div>
				<PreviewDocumet />
			</div>

		</div>

	);
}

export default BankDetails;
