import { Loader } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import getShipmentQuotation from '../../../../../../hooks/revenueDeskHooks/getShipmentQuotation';

import styles from './styles.module.css';

function SellServcieQuotation({ shipmentData = {} }) {
	const { service_charges, loading } = getShipmentQuotation(shipmentData?.id);

	const EmptyContent = {
		heading     : 'No Results Found!',
		description : 'Something Went Wrong! Please try agin later.',
	};

	return (
		<div className={styles.container}>
			{loading ? <Loader height="20px" width="20px" /> : null}
			{ !loading && !service_charges?.length ? (
				<EmptyState showContent={EmptyContent} />
			) : null}

			{service_charges?.length ? (
				<>
					<div className={styles.heading}>Full Sell Quotation</div>
					<div className={styles.service_content}>
						<div className={styles.sub_heading}>Services</div>
						<div className={styles.sub_heading}>Services Charge</div>
					</div>

					{(service_charges || []).map((serviceObj) => {
						if (serviceObj?.service_type) {
							return (
								<div className={styles.service_content}>
									<div>
										{startCase(serviceObj?.service_type)}
									</div>
									<div>
										{ getFormattedPrice(
											'en-IN',
											serviceObj?.total_price_discounted,
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

export default SellServcieQuotation;
