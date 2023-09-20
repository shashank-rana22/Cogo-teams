import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';
import { v1 as uuid } from 'uuid';

import BusinessDetails from './BusinessDetails';
import styles from './styles.module.css';

function BuySellServices({ sell_services = [], buy_services = [], business_details = [] }) {
	return (
		<div className={styles.container}>
			{!isEmpty(buy_services) && (
				<div className={styles.services}>
					<h4 className={styles.title}>BUY SERVICES</h4>

					<div className={styles.data}>
						{buy_services.map((service, index) => (
							<div
								className={styles.common}
								key={`${`${index}${uuid()}`}`}
							>
								{startCase(service?.service)}
							</div>
						))}
					</div>
				</div>
			)}
			<div className={styles.services}>
				<h4 className={styles.title}>SELL SERVICES</h4>
				<div className={styles.data}>
					{isEmpty(sell_services) && (
						<div className={styles.no_service}>No sell services</div>
					)}
					{sell_services.map((service, index) => (
						<div
							className={styles.common}
							key={`${`${index}${uuid()}`}`}
						>
							{startCase(service)}
						</div>
					))}
				</div>
			</div>
			<BusinessDetails business_details={business_details} />
		</div>
	);
}

export default BuySellServices;
