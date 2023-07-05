import { startCase } from '@cogoport/utils';
import React from 'react';

import fieldsInPaymentDetails from '../../../../utils/fieldsInPaymentDetails';
import getShortFileName from '../../../../utils/getShortFileName';

import styles from './styles.module.css';

const PAYMENT_DETAILS_CONSTANT = 0;

const DO_NOT_STARTCASE = ['bank_document_url', 'tax_document_url', 'address'];

function PaymentDetails({
	detail,
}) {
	const FIELDS_TO_SHOW = fieldsInPaymentDetails();
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[PAYMENT_DETAILS_CONSTANT]?.[fieldName] || '';

		if (!val) {
			return '-';
		}

		if (['bank_document_url', 'tax_document_url'].includes(fieldName)) {
			console.log(val, 'val');
			console.log(fieldName, 'fieldName');
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

	console.log(detail, 'detail');

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
						const label = FIELDS_TO_SHOW[fieldName];

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
