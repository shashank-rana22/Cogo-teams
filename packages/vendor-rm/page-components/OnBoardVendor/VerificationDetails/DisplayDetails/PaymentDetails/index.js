import getGeoConstants from '@cogoport/globalization/constants/geo';
import { startCase } from '@cogoport/utils';
import React from 'react';

import getShortFileName from '../../../../utils/getShortFileName';

import styles from './styles.module.css';

const FIELDS_TO_SHOW = {
	account_holder_name : 'Account Holder’s Name',
	account_number      : 'Account No.',
	account_type        : 'Account Type',
	ifsc_code           : 'IFSC Code',
	swift_code          : 'SWIFT Code',
	bank_name           : 'Bank Name',
	branch_name         : 'Branch Name',
	bank_document_url   : 'Cancelled Cheque/Passbook',
	address             : 'Billing Address',
	tax_number          : 'GST Number',
	tax_document_url    : 'GST Proof',
};

const geo = getGeoConstants();

const PAYMENT_DETAILS_CONSTANT = 0;

const DO_NOT_STARTCASE = ['bank_document_url', 'tax_document_url', 'address'];

function PaymentDetails({
	detail,
}) {
	const REGISTRATION_TYPES = geo.others.navigations.onboard_vendor.registration_types;
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[PAYMENT_DETAILS_CONSTANT]?.[fieldName] || '';

		if (!val) {
			return '-';
		}

		if (['bank_document_url', 'tax_document_url'].includes(fieldName)) {
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
					{Object.keys(FIELDS_TO_SHOW).map((fieldName) => {
						const fieldValue = detail?.[PAYMENT_DETAILS_CONSTANT]?.[fieldName];
						let label = FIELDS_TO_SHOW[fieldName];
						if (fieldValue) {
							if (REGISTRATION_TYPES && label === 'GST Number') {
								label = 'VAT Number';
							} else if (REGISTRATION_TYPES && label === 'GST Proof') {
								label = 'VAT Proof';
							}
						}
						return (
							<div
								key={fieldName}
								className={styles.fields_to_show}
								style={{
									flexBasis: detail?.[PAYMENT_DETAILS_CONSTANT]?.[fieldName]
										? `${fieldName === 'address' ? '40%' : '20%'}` : 'none',
								}}
							>
								{detail?.[PAYMENT_DETAILS_CONSTANT]?.[fieldName]
						&& (
							<div>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.value}>
									{getDisplayValue({ fieldName })}
								</div>
							</div>
						)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PaymentDetails;
