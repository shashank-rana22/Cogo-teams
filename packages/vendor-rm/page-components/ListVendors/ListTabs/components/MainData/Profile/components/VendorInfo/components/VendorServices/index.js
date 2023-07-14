import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getSeviceMapping = (service) => {
	const { category, cogoport_office } = service || {};

	return {
		service_category: {
			key   : 'service_category',
			label : 'Service Category',
			value : startCase(category),
		},
		cogoport_office: {
			key   : 'cogoport_office',
			label : 'Cogoport Office',
			value : cogoport_office?.display_name,
		},
	};
};

function VendorServices({
	data = {},
}) {
	return (
		<>
			{(data?.services || []).map((service) => {
				const SERVICE_MAPPING = getSeviceMapping(service);

				return (
					<div className={styles.content} key={service?.id}>
						{Object.keys(SERVICE_MAPPING).map((service_item) => {
							const { label, value } = SERVICE_MAPPING[service_item] || {};

							return (
								<div className={styles.box_info} key={label}>
									<div className={styles.top}>
										{label}
									</div>
									<div className={styles.bottom}>
										{value}
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</>
	);
}

export default VendorServices;
