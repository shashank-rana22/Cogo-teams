import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const BANK_DETAILS_MAPPING = {
	account_holder_name : 'Account Holder&apos;s Name',
	account_number      : 'Account No.',
	account_type        : 'Account Type',
	ifsc_code           : 'IFSC Code',
	bank_name           : 'Bank Name',
	branch_name         : 'Branch Name',
};

function PaymentDetails({
	data = {},
}) {
	return (
		(data.bank_details || []).map((bankDetail) => (
			<>
				<div className={styles.main_container}>
					<div className={styles.bank_details_container}>
						{Object.keys(BANK_DETAILS_MAPPING).map((bankDetailsKey) => (
							<div key={bankDetailsKey} className={styles.box_info}>
								<div className={styles.label}>
									{BANK_DETAILS_MAPPING[bankDetailsKey]}
								</div>
								<div className={styles.value}>
									{startCase(bankDetail[bankDetailsKey])}
								</div>
							</div>
						))}

					</div>

					<div>
						{
						bankDetail?.bank_document_url ? (
							<div className={styles.box_info}>
								<div className={styles.top}>
									Cancelled Cheque/Passbook
								</div>
								<div className={styles.bottom}>
									<div className={styles.document_url_container}>
										<a
											href={bankDetail?.bank_document_url}
											target="_blank"
											className={styles.txt}
											style={{
												color: '#F68B21',
											}}
											rel="noreferrer"
										>
											{bankDetail?.bank_document_url}
										</a>
										<div className={styles.download_button_icon}>
											<img
												src={`https://cdn.cogoport.io/cms-prod/
											cogo_admin/vault/original/download-icon.svg`}
												alt="icon-download"
											/>

										</div>
									</div>
								</div>
							</div>
						) : null
						}
					</div>

				</div>
				<div className={styles.billing_address_info_box}>
					<div className={styles.label}>
						Billing Address
					</div>
					<div className={styles.billing_address_value}>
						{bankDetail?.address}
					</div>
				</div>

			</>
		))
	);
}

export default PaymentDetails;
