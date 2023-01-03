import styles from './styles.module.css'
import React from 'react';
const CustomerInformation = ({ data }) => {
	
	const { customerDetails } = data || {};
		

	return (customerDetails || []).map((item) => {
		const {
			id,
			customerName,
			customerOutstandingAmount,
			customerOutstandingAmountOnSid,
		} = item || {};

		return (
			<div className={styles.container} key={id}>
				<div className={styles.subContainer}>
					Name - <span style={{ fontWeight: 600 }}>{customerName}</span>
				</div>

				<div className={styles.subContainer}>
					Total Outstanding -
					<span style={{ fontWeight: 600 }}>
						{customerOutstandingAmount}
						{/* {getFormattedPrice(numLocale, customerOutstandingAmount, 'INR')} */}
					</span>
				</div>

				<div className={styles.subContainer}>
					On Account Payments -
					<span style={{ fontWeight: 600 }}>
						{customerOutstandingAmountOnSid}
						{/* {getFormattedPrice(
							numLocale,
							customerOutstandingAmountOnSid,
							'INR',
						)} */}
					</span>
				</div>
			</div>
		);
	});
};
export default CustomerInformation;
