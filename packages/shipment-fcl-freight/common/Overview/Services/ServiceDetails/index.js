import { cl } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import styles from './styles.module.css';

function ServiceDetails({ servicesData = [] }) {
	const {
		service_type = '',
		state = '',
	} = servicesData?.[0] || {};

	const addedServiceComponent = (
		<div className={cl`${styles.container} ${styles.state}`}>
			<Header serviceData={servicesData?.[0]} />
		</div>
	);

	return addedServiceComponent;
}

export default ServiceDetails;
