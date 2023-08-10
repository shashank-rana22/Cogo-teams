import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

interface CustomerDetailsInterface {
	id: string;
	customerName: string;
	customerOutstandingAmount: number;
	customerOutstandingAmountOnSid: number;
}
interface DataInterface {
	customerDetails?: Array<CustomerDetailsInterface>;
}
type CustomerInformationInterface = {
	data: DataInterface;
};

function CustomerInformation({
	data,
}: CustomerInformationInterface): JSX.Element {
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
									amount   :	customerOutstandingAmount as any,
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
									amount   :	customerOutstandingAmountOnSid as any,
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
