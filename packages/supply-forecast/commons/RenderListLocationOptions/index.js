import { IcMPort, IcMLocation, IcMAirport, IcAWarehouse, IcMWater, IcMHaulage } from '@cogoport/icons-react';

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

function RenderListLocationOptions({ data = {} }) {
	const { site_code = '', type = '', postal_code = '' } = data;

	const locationCode = data.port_code || data.postal_code;
	const locationName = data.name;

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.icon_container}>{ICON_MAPPING[type]}</div>

				<div className={styles.name_container}>
					<div className={styles.location_name}>{locationName}</div>
					<div className={styles.subheading}>{locationCode}</div>
				</div>
			</div>

			<div className={styles.code}>{type === 'pincode' ? postal_code : site_code}</div>
		</div>
	);
}

export default RenderListLocationOptions;
