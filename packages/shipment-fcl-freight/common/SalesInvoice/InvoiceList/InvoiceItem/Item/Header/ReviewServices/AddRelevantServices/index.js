import React from 'react';
import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

const AddRelevantServices = () => {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Please add all relevant services sold to the customer, or confirm that
				they don’t apply to this shipment.
			</div>

			<div className={styles.service_container}>
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
			</div>
		</div>
	);
};

export default AddRelevantServices;
