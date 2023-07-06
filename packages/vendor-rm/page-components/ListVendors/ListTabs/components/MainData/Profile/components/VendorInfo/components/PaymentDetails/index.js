import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import fieldsInPaymentDetails from '../../../../../../../../../utils/fieldsInPaymentDetails';
import getShortFileName from '../../../../../../../../../utils/getShortFileName';

import styles from './styles.module.css';

const DO_NOT_STARTCASE = ['bank_document_url', 'tax_document_url', 'address'];

function PaymentDetails({
	data = {},
}) {
	const FIELDS_TO_SHOW = fieldsInPaymentDetails();
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
					<img src={GLOBAL_CONSTANTS.image_url.download_icon_svg} alt="" />
				</a>
			);
		}

		if (DO_NOT_STARTCASE.includes(key)) {
			return val;
		}

		return startCase(val);
	};

	console.log(data.bank_details, 'bankdetail');

	return (
		(data.bank_details || []).map((bankDetail, index) => (
			<div
				className={styles.main_container}
				key={bankDetail.id}
				style={{ borderTop: index > GLOBAL_CONSTANTS.zeroth_index ? '1px dashed #707070' : '' }}
			>
				<div className={styles.bank_details_container}>
					{Object.keys(FIELDS_TO_SHOW).map((bankDetailsKey) => {
						const label = FIELDS_TO_SHOW[bankDetailsKey];
						return (
							<div
								key={bankDetailsKey}
								className={styles.box_info}
								style={{
									width: bankDetail?.[bankDetailsKey] !== null
										? '50%' : 'none',
								}}
							>
								{bankDetail?.[bankDetailsKey] && (
									<div>
										<div className={styles.label}>
											{label}
										</div>

										<div className={styles.value}>
											{getDisplayValue({ bankDetail, key: bankDetailsKey })}
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		))
	);
}

export default PaymentDetails;
