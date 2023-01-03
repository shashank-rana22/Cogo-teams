import React from 'react';
import styles from './styles.module.css'
interface CustomerDetailsInterface {
	id:string
	customerName:string
	customerOutstandingAmount:number
	customerOutstandingAmountOnSid:number
}
interface DataInterface {
	customerDetails?:Array<CustomerDetailsInterface>
}
type CustomerInformationInterface = {
	data:DataInterface
}

const CustomerInformation = ({ data }:CustomerInformationInterface): JSX.Element => {
	
	const { customerDetails } = data || {};
		
	return <>{
		(customerDetails || []).map((item) => {
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
		})
	}</> 
};
export default CustomerInformation;
