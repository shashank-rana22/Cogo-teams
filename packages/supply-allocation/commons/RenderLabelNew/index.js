import { IcMPort, IcMLocation, IcMAirport, IcAWarehouse, IcMWater, IcMHaulage } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ICON_MAPPING = {
	seaport          : <IcMPort />,
	airport          : <IcMAirport />,
	country          : <IcMLocation />,
	city             : <IcMLocation />,
	warehouse        : <IcAWarehouse />,
	pincode          : <IcMLocation />,
	riverport        : <IcMWater />,
	railway_terminal : <IcMHaulage />,
};

const formatSubLocation = (display_name) => {
	const dp = display_name?.split(',');
	const [, subLocation, dp2] = dp || [];
	return dp2 ? `${subLocation}, ${dp2}` : subLocation;
};

function LocationOption({ data = {} }) {
	const { port_code, postal_code, name:locationName, type, display_name } = data;

	const locationCode = port_code || postal_code;

	const subLocation = formatSubLocation(display_name);

	return (
		<>
			<div style={{ marginRight: '10px' }}>
				{ICON_MAPPING[type] || <IcMLocation />}
			</div>

			<div className={styles.main}>
				<div className={styles.SpaceBetween}>
					<p className={styles.location_name}>
						{locationName}
					</p>

					{locationCode && (
						<p className={styles.location_code}>
							{locationCode}
						</p>
					)}

				</div>

				<div className={styles.space_between}>
					<p className={styles.sub_location}>
						<span>{data.history ? `${startCase(data.type)} | ` : ''}</span>
						{subLocation}
					</p>
				</div>
			</div>
		</>
	);
}

export default LocationOption;
