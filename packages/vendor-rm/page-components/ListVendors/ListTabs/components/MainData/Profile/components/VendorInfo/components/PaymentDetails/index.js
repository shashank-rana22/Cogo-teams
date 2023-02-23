/* eslint-disable jsx-a11y/control-has-associated-label */
import { IcCFtick, IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PaymentDetails({
	data = {},
}) {
	return (
		(data.bank_details || []).map((bankDetail) => (
			<>
				<div className={styles.cont}>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account Holder’s Name
						</div>
						<div className={styles.bottom}>
							{startCase(bankDetail.account_holder_name)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account No.
						</div>
						<div className={styles.bottom}>
							{bankDetail.account_number}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account Type
						</div>
						<div className={styles.bottom}>
							{startCase(bankDetail.account_type)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							IFSC Code
						</div>
						<div className={styles.bottom}>
							{bankDetail.ifsc_code}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Bank Name
						</div>
						<div className={styles.bottom}>
							{bankDetail.bank_name}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Branch Name
						</div>
						<div className={styles.bottom}>
							{bankDetail.branch_name}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Cancelled Cheque/Passbook
						</div>
						<div className={styles.bottom}>
							<div className={styles.di}>
								<a
									href={bankDetail?.bank_document_url}
									target="_blank"
									className={styles.txt}
									style={{
										color: 'orange',
									}}
									rel="noreferrer"
								>
									{bankDetail?.bank_document_url}
								</a>
								<IcCFtick />
								<div className={styles.btn}><IcMDownload /></div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.box_info1}>
					<div className={styles.top}>
						Billing Address
					</div>
					<div className={styles.bottom1}>
						{bankDetail?.address}
					</div>
				</div>
				<hr className={styles.dis1} />
			</>
		))
	);
}

export default PaymentDetails;
