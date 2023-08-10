import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function LocationDetails({ data = {}, source = '' }) {
	return (
		<Tooltip
			placement="top"
			content={data?.display_name}
		>
			<div className={styles.port_name_code}>
				<span className={`${styles.port_name} ${source === 'modal' ? styles.max_width_modal : ''}`}>
					{data?.name}
				</span>
				<span className={`${styles.port_code}`}>{` (${data?.port_code})`}</span>
				<span className={`${styles.port_country}  ${source === 'modal' ? styles.max_width_modal : ''}`}>
					{`, ${(data?.display_name || '').split(',')[2]}`}
				</span>
			</div>
		</Tooltip>
	);
}
export default LocationDetails;
