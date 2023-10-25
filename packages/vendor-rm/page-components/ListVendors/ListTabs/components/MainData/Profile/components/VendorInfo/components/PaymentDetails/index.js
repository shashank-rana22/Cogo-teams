import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
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
	function GetDisplayValue({ bankDetail, key }) {
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
					<Image src={GLOBAL_CONSTANTS.image_url.download_icon_svg} width={30} height={30} />
				</a>
			);
		}

		if (DO_NOT_STARTCASE.includes(key)) {
			return val;
		}

		return startCase(val);
	}

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

						if (!bankDetail?.[bankDetailsKey]) return null;

						return (
							<div
								key={bankDetailsKey}
								className={styles.box_info}
							>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.value}>
									{GetDisplayValue({ bankDetail, key: bankDetailsKey })}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		))
	);
}

export default PaymentDetails;
