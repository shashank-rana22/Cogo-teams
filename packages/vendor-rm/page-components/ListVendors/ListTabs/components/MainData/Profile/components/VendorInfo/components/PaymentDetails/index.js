import { startCase } from '@cogoport/utils';
import React from 'react';

import getShortFileName from '../../../../../../../../../utils/getShortFileName';

import styles from './styles.module.css';

const fieldsToShow = {
	account_holder_name : 'Account Holder’s Name',
	account_number      : 'Account No.',
	account_type        : 'Account Type',
	ifsc_code           : 'IFSC Code',
	bank_name           : 'Bank Name',
	branch_name         : 'Branch Name',
	bank_document_url   : 'Cancelled Cheque/Passbook',
	address             : 'Billing Address',
	tax_number          : 'GST Number',
	tax_document_url    : 'GST Proof',
};

const DO_NOT_STARTCASE = ['bank_document_url', 'tax_document_url', 'address'];

function PaymentDetails({
	data = {},
}) {
	const getDisplayValue = ({ bankDetail, key }) => {
		const val = bankDetail[key];

		if (!val) {
			return '-';
		}

		if (['bank_document_url', 'tax_document_url'].includes(key)) {
			const shortName = getShortFileName({ url: val });

			return (
				<a
					className={styles.icon_container}
					href={val}
					target="_blank"
					rel="noreferrer"
				>
					{shortName}
					<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg" alt="" />
				</a>
			);
		}

		if (DO_NOT_STARTCASE.includes(key)) {
			return val;
		}

		return startCase(val);
	};

	return (
		(data.bank_details || []).map((bankDetail, index) => (
			<div className={styles.main_container} style={{ borderTop: index > 0 ? '1px dashed #707070' : '' }}>
				<div className={styles.bank_details_container}>
					{Object.keys(fieldsToShow).map((bankDetailsKey) => (
						<div
							key={bankDetailsKey}
							className={styles.box_info}
							style={{
								flexBasis: `${bankDetailsKey === 'address' ? '60%' : '20%'}`,
							}}
						>
							<div className={styles.label}>
								{fieldsToShow[bankDetailsKey]}
							</div>

							<div className={styles.value}>
								{getDisplayValue({ bankDetail, key: bankDetailsKey })}
							</div>
						</div>
					))}
				</div>
			</div>
		))
	);
}

export default PaymentDetails;
