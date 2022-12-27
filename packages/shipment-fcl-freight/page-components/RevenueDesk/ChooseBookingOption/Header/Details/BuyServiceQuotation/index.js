import React from 'react';
// import { Skeleton } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/utils';
// import { getFormattedPrice } from '@cogo/i18n';
import EmptyState from '../../../../../../commons/EmptyState';
import useGetBuyQuotation from '../../../../../../hooks/revenueDeskHooks/useGetBuyQuotation';
import styles from './styles.module.css';


const BuyServiceQuotation = ({ shipmentData = {} }) => {
	
	const {service_charges, loading} = useGetBuyQuotation(shipmentData);

	const EmptyContent = {
		heading: 'No Results Found!',
		description: 'Something Went Wrong! Please try agin later.',
	};

	return (
		<>
			<div className={styles.container}>
				{/* {loading ? <Skeleton height="20px" width="90%" margin="16px" /> : null} */}
				{!service_charges?.length && !loading ? (
					<EmptyState showContent={EmptyContent} />
				) : null}
                
				{ service_charges?.length ? (
					<>
						<div className = {styles.heading}>Buy Quotation</div>
						<div className={styles.serviceContent}>
							<div className={styles.subHeading}>Services</div>
							<div className={styles.subHeading}>Services Charge</div>
						</div>
						{(service_charges || []).map((serviceObj) => {
							if (serviceObj?.service_type) {
								return (
									<div className={styles.serviceContent}>
										<div>
											{startCase(serviceObj?.service_type)}
										</div>
										<div>
											{`(
												${serviceObj?.total_price},
												${serviceObj?.currency} || 'INR',
											)`}
										</div>
									</div>
								);
							}
							return null;
						})}
					</>
				) : null}
			</div>
		</>
	);
};
export default BuyServiceQuotation;