import React from 'react';

import getFormattedPrice from '../../../../../../commons/utils/getFormattedPrice';

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
								{getFormattedPrice(customerOutstandingAmount, 'INR')}
							</span>
						</div>

						<div className={styles.sub_container}>
							On Account Payments -
							<span style={{ fontWeight: 600 }}>
								{getFormattedPrice(customerOutstandingAmountOnSid, 'INR')}
							</span>
						</div>
					</div>
				);
			})}
		</>
	);
}
export default CustomerInformation;
