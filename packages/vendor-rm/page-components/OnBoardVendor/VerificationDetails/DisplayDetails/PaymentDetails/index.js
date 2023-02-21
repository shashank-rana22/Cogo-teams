import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import getShortFileName from '../utils/getShortFileName';

import styles from './styles.module.css';

const filedsToShow = {
	account_holder_name : 'Account Holder’s Name',
	account_number      : 'Account No.',
	account_type        : 'Account Type',
	ifsc_code           : 'IFSC Code',
	bank_name           : 'Bank Name',
	branch_name         : 'Branch Name',
	bank_document_url   : 'Cancelled Cheque/Passbook',
	address             : 'Billing Address',
};

const DO_NOT_STARTCASE = ['bank_document_url', 'address'];

function PaymentDetails({
	detail,
}) {
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[0]?.[fieldName];

		if (fieldName === 'bank_document_url') {
			const shortName = getShortFileName({ url: val });
			return (
				<a
					className={styles.icon_container}
					href={val}
					target="_blank"
					rel="noreferrer"
				>
					{shortName}
					<IcMDownload className={styles.icon} />
				</a>
			);
		}

		if (DO_NOT_STARTCASE.includes(fieldName)) {
			return val;
		}

		return startCase(val);
	};

	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Payment Details
			</div>
			<div className={styles.body}>
				<div className={styles.single_record}>
					{
						Object.keys(filedsToShow).map((fieldName) => (
							<div style={{
								display       : 'flex',
								flexDirection : 'column',
								flexBasis     : `${fieldName === 'address' ? '75%' : '25%'}`,
							}}
							>
								<div className={styles.label}>
									{filedsToShow[fieldName]}
								</div>
								<div className={styles.value}>
									{getDisplayValue({ fieldName })}
								</div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default PaymentDetails;
