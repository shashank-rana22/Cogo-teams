import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function LocationDetails({ data }) {
	return (
		<div className={styles.container}>
			<Tooltip
				placement="top"
				content={data.display_name}
				// theme="light-border"
			>
				<div className={styles.port_name_code}>
					<div className={`${styles.port} ${styles.port_name}`}>{data.name}</div>
					{' '}
					<div className={`${styles.port} ${styles.port_code}`}>
						(
						{data.port_code}
						)
					</div>
				</div>
			</Tooltip>
			<div className={styles.port}>
				,
				{' '}
				{(data.display_name || '').split(',')[2]}
			</div>
		</div>
	);
}
export default LocationDetails;
