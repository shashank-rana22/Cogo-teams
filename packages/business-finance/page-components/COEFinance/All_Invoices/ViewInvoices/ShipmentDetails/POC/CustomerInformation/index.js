import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function CustomerInformation({
	data,
}) {
	const { customerDetails } = data || {};

	return (
		<>
			{(customerDetails || []).map((item) => {
				const {
					id,
					customerName,
					customerOutstandingAmount,
					customerOutstandingAmountOnSid,
				} = item || {};

				return (
					<div className={styles.container} key={id}>
						<div className={styles.sub_container}>
							Name -
							{' '}
							<span style={{ fontWeight: 600 }}>{customerName}</span>
						</div>

						<div className={styles.sub_container}>
							Total Outstanding -
							<span style={{ fontWeight: 600 }}>
								{formatAmount({
									amount   :	customerOutstandingAmount,
									currency :	GLOBAL_CONSTANTS.currency_code.INR,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</span>
						</div>

						<div className={styles.sub_container}>
							On Account Payments -
							<span style={{ fontWeight: 600 }}>
								{formatAmount({
									amount   :	customerOutstandingAmountOnSid,
									currency : GLOBAL_CONSTANTS.currency_code.INR,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</span>
						</div>
					</div>
				);
			})}
		</>
	);
}
export default CustomerInformation;
