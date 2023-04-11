import { cl } from '@cogoport/components';
import React from 'react';

import getConfigs from '../configurations/get-configs';

import Details from './Details';
import Header from './Header';
import Status from './Status';
import styles from './styles.module.css';

function ServiceDetails({
	servicesData = [],
	shipmentData = {},
}) {
	const {
		id = '',
		service_type = '',
		state = '',
		trade_type = '',
		payment_term = '',
		display_label = '',
	} = servicesData?.[0] || {};

	const service_items_key = getConfigs(service_type).details || {};

	const addedServiceComponent = (
		<div className={cl`${styles.container} ${state}`}>
			<Header
				id={id}
				state={state}
				trade_type={trade_type}
				heading={display_label}
				service_type={service_type}
			/>

			<Status state={state} payment_term={payment_term} />

			{(servicesData || []).map((singleService, index) => (
				<div
					className={cl`${servicesData?.length === index + 1 ? styles.last : styles.other}`}
				>
					<Details
						serviceData={singleService}
						shipmentData={shipmentData}
						serviceItemsKey={service_items_key}
					/>
				</div>
			))}

		</div>
	);

	return addedServiceComponent;
}

export default ServiceDetails;
