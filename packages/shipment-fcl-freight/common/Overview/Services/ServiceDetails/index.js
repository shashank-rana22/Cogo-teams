import { cl } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import styles from './styles.module.css';

function ServiceDetails({ servicesData = [] }) {
	const addedServiceComponent = (
		<div className={cl`${styles.container}`}>
			<Header serviceData={servicesData} />
		</div>
	);

	return addedServiceComponent;
}

export default ServiceDetails;
