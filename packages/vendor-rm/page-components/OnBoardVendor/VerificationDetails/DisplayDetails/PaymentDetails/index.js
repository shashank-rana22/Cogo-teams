import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const filedsToShow = {
	account_holder_name : 'Account Holder’s Name',
	account_number      : 'Account No.',
	account_type        : 'Account Type',
	ifsc_code           : 'IFSC Code',
	bank_name           : 'Bank Name',
	branch_name         : 'Branch Name',
	bank_document_id    : 'Cancelled Cheque/Passbook',
	address             : 'Billing Address',
};

function PaymentDetails({
	detail,
}) {
	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Payment Details
			</div>
			<div className={styles.body}>
				{
					// (detail || []).map((item) => (
					<div className={styles.single_record}>
						{
								Object.keys(filedsToShow).map((wantedField) => {
									const val = detail?.[0]?.[wantedField];
									return (
										// eslint-disable-next-line max-len
										<div style={{ display: 'flex', flexDirection: 'column', flexBasis: `${wantedField === 'address' ? '75%' : '25%'}` }}>
											<div className={styles.label}>
												{filedsToShow[wantedField]}
											</div>
											<div className={styles.value}>
												{startCase(val)}
											</div>
										</div>
									);
								})
							}
					</div>
					// ))
				}
			</div>
		</div>
	);
}

export default PaymentDetails;
