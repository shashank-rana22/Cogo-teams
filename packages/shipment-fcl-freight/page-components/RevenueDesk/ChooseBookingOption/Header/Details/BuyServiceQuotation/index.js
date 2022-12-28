import { Loader } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import useGetBuyQuotation from '../../../../../../hooks/revenueDeskHooks/useGetBuyQuotation';

import styles from './styles.module.css';

function BuyServiceQuotation({ shipmentData = {} }) {
	const { service_charges, loading } = useGetBuyQuotation(shipmentData);

	const EmptyContent = {
		heading     : 'No Results Found!',
		description : 'Something Went Wrong! Please try agin later.',
	};

	return (
		<div className={styles.container}>
			{loading ? <Loader height="20px" width="90%" /> : null}
			{!service_charges?.length && !loading ? (
				<EmptyState showContent={EmptyContent} />
			) : null}

			{ service_charges?.length ? (
				<>
					<div className={styles.heading}>Buy Quotation</div>
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
										{ getFormattedPrice(
											'en-IN',
											serviceObj?.total_price,
											serviceObj?.currency,
										)}
									</div>
								</div>
							);
						}
						return null;
					})}
				</>
			) : null}
		</div>
	);
}
export default BuyServiceQuotation;
