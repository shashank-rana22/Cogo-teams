import React from 'react';
// import { Skeleton } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/utils';
// import { getFormattedPrice } from '@cogo/i18n';
import EmptyState from '../../../../../../commons/EmptyState';
// import getShipmentQuotation from '../../../hooks/getShipmentQuotation';
// import QuotationData from '../../../Hooks/getShipmentQuotation.json'
import styles from './styles.module.css'

const SellServcieQuotation = ({ shipmentData = {} }) => {
	
    const  {service_charges} = QuotationData;
	const EmptyContent = {
		heading: 'No Results Found!',
		description: 'Something Went Wrong! Please try agin later.',
	};

	return (
		<>
			<div className={styles.container}>
				{/* {loading ? <Skeleton height="20px" width="90%" margin="16px" /> : null}
				{!service_charges?.length && !loading ? (
					<EmptyState showContent={EmptyContent} />
				) : null} */}

				{service_charges?.length ? (
					<>
						<div className={styles.heading}>Full Sell Quotation</div>
						<div className={styles.serviceContent}>
							<div className= {styles.subHeading}>Services</div>
							<div className= {styles.subHeading}>Services Charge</div>
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
												${serviceObj?.total_price_discounted},
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

export default SellServcieQuotation;