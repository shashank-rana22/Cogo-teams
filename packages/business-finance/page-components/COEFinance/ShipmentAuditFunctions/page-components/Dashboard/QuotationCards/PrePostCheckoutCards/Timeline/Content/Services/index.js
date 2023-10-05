import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { getFormatAmount } from '../../../../../../../utils/getFormatAmount';

import styles from './styles.module.css';

// const MAX_LEN = 15;

export default function Services(
	{
		activeService,
		services,
		handleServiceClick,
		// firstService,
		defaultSelectedService,
	},
) {
	return (
		<>
			{Object.keys(services).map((service) => (

				service.includes('service') || service.includes('platform_fee')
					? (
						<div
							key={service}
							role="presentation"
							className={cl`${styles.services} ${
								activeService === service ? styles.active : ''
							}`}
							onClick={() => {
								if (activeService === service) {
									handleServiceClick(defaultSelectedService);
								} else {
									handleServiceClick(service);
								}
							}}
						>
							{/* {console.log(servicesFromBackend?.[service]?.[0]?.grandTotal)} */}
							<div>
								<div className={styles.service_title}>
									{startCase(service)}
									{/* {console.log(startCase(service).substr(0, 10))}
							<Tooltip
								content={(
									<div>
										{startCase(service) || '-'}
									</div>
								)}
								interactive
							>
								<div>
									{(startCase(service)?.length > MAX_LEN
										? `${(startCase(service))?.substr(GLOBAL_CONSTANTS.zeroth_index, MAX_LEN)}...`
										: startCase(service)) || '-'}
								</div>
							</Tooltip> */}
								</div>
								<div>
									{getFormatAmount(services?.[service]?.[GLOBAL_CONSTANTS.zeroth_index]
										?.grandTotal, services?.[service]?.[GLOBAL_CONSTANTS.zeroth_index]
										?.currency || 'INR')}
								</div>
							</div>
						</div>
					)
					: null
			))}

		</>
	);
}
