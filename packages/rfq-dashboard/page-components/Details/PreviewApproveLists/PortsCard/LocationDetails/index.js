import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function LocationDetails() {
	return (
		<div className={styles.container}>
			<Tooltip theme="light-border">
				<div className={styles.port_name_code}>
					<div className={`${styles.port} ${styles.port_name}`}>Shangai</div>
					{' '}
					<div className={`${styles.port} ${styles.port_code}`}>(CNSHA)</div>
				</div>
			</Tooltip>
			<div className={styles.port}>, China</div>
		</div>
	);
}
export default LocationDetails;
