import { cl, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function PortName({ portName = '', countryName = '' }) {
	return (
		<Tooltip
			placement="bottom"
			content={(
				<div>
					<div>{portName}</div>
					<div>{countryName}</div>
				</div>
			)}
		>
			<div className={styles.port_container}>
				<div className={cl`${styles.overflow_div} ${styles.port_name}`}>
					{portName}
				</div>
				<div className={cl`${styles.overflow_div} ${styles.country_name}`}>
					{countryName}
				</div>
			</div>
		</Tooltip>
	);
}
function EachPortPairCard({ eachItem = {} }) {
	const {
		origin_port = '',
		origin_country = '',
		destination_port = '',
		destination_country = '',
	} = eachItem || {};

	return (
		<div className={styles.container}>
			<PortName portName={origin_port} countryName={origin_country} />
			<IcMPortArrow className={styles.icon_styles} />
			<PortName portName={destination_port} countryName={destination_country} />
		</div>
	);
}
export default EachPortPairCard;
