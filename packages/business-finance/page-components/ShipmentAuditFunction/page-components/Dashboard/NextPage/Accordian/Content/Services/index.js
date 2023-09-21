import { Button, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

export default function Services(
	{
		activeService,
		servicesFromBackend,
		handleServiceClick,
	},
) {
	return (
		<>
			{servicesFromBackend.map((service, index) => (

				<div
					key={index}
					className={cl`${styles.services} ${
						activeService === service ? styles.active : ''
					}`}
					onClick={() => {
						if (activeService === service) {
							handleServiceClick('Service 1');
						} else {
							handleServiceClick(service);
						}
					}}
				>
					{service}
				</div>
			))}
			{/* <Button
				size="xl"
				themeType="secondary"
				className={styles.services}
			>
				Service 4
			</Button> */}
		</>
	);
}
