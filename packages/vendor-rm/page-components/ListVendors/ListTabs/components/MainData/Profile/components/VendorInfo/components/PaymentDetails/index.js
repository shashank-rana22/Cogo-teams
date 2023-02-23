/* eslint-disable jsx-a11y/control-has-associated-label */
import { IcCFtick, IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PaymentDetails({ data = {} }) {
	// eslint-disable-next-line max-len
	const address = 'Prabhushankar Ramanayak ,Sahil Import Export Private Limited, 6th Floor, A Wing, Ackruti Trade Center, Kondivita, Andheri East,Mumbai - 400069, Maharashtra, India.';
	return (
		(data.bank_details || []).map((i) => (
			<>
				<div className={styles.cont}>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account Holder’s Name
						</div>
						<div className={styles.bottom}>
							{startCase(i.account_holder_name)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account No.
						</div>
						<div className={styles.bottom}>
							{i.account_number}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Account Type
						</div>
						<div className={styles.bottom}>
							{startCase(i.account_type)}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							IFSC Code
						</div>
						<div className={styles.bottom}>
							{i.ifsc_code}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Bank Name
						</div>
						<div className={styles.bottom}>
							{i.bank_name}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Branch Name
						</div>
						<div className={styles.bottom}>
							{i.branch_name}
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.top}>
							Cancelled Cheque/Passbook
						</div>
						<div className={styles.bottom}>
							<div className={styles.di}>
								<span className={styles.txt} style={{ color: 'orange' }}>{i.account_number}</span>
								<IcCFtick />
								<button className={styles.btn}><IcMDownload /></button>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.box_info1}>
					<div className={styles.top}>
						Billing Address
					</div>
					<div className={styles.bottom1}>
						{address}
					</div>
				</div>
				<hr className={styles.dis1} />
			</>
		))
	);
}

export default PaymentDetails;
