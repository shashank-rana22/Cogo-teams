import React from 'react';

import CompanyPOC from './components/CompanyPOC';
import ServicePOC from './components/ServicePOC';
import Top from './components/Top';
import styles from './styles.module.css';

function ServicesUsers() {
	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Top />
				<CompanyPOC />
				<ServicePOC />
			</div>
		</div>
	);
}

export default ServicesUsers;
