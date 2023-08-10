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

function RenderListLocationOption({ item = {} }) {
	const { display_name = '', site_code = '', type = '', postal_code = '' } = item;

	const [heading = '', ...rest] = display_name.split(',');
	const subheading = rest.join(',');

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.icon_container}>{ICON_MAPPING[type]}</div>

				<div>
					<div>{heading}</div>
					<div className={styles.subheading}>{subheading}</div>
				</div>
			</div>

			<div className={styles.code}>{type === 'pincode' ? postal_code : site_code}</div>
		</div>
	);
}

export default RenderListLocationOption;
