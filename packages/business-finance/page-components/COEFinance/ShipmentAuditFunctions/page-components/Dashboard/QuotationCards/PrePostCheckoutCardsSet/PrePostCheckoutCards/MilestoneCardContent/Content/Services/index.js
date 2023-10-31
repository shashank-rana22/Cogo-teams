import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { getFormatAmount } from '../../../../../../../../utils/getFormatAmount';

import styles from './styles.module.css';

export default function Services(
	{
		activeService = '',
		services = {},
		handleServiceClick = () => {},
		defaultSelectedService = () => {},
	},
) {
	return (
		<>
			{Object.keys(services).map((service) => (
				service?.includes('service') || service?.includes('platform_fee')
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
							<div>
								<div className={styles.service_title}>
									{startCase(service)}
								</div>

								{services?.[service]?.[GLOBAL_CONSTANTS.zeroth_index]?.quotationState === 'APPROVED'
									? (
										<IcCFtick />
									)
									: null}
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
