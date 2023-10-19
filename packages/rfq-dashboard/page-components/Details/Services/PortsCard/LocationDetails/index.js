import { Tooltip, cl } from '@cogoport/components';

import styles from './styles.module.css';

function LocationDetails({ data = {}, source = '' }) {
	return (
		<Tooltip
			placement="top"
			content={data?.display_name}
		>
			<div className={styles.port_name_code}>
				<span className={cl`${styles.port_name} 
          ${source === 'modal' ? styles.max_width_modal : ''} 
          ${source === 'single' ? styles.full_width : ''}`}
				>
					{data?.name}
				</span>
				<span className={`${styles.port_code}`}>{` (${data?.port_code})`}</span>
				<span className={cl`${styles.port_country}
            ${source === 'modal' ? styles.max_width_modal : ''}
            ${source === 'single' ? styles.full_width : ''}`}
				>
					{`, ${(data?.display_name || '').split(',')[2]}`}
				</span>
			</div>
		</Tooltip>
	);
}
export default LocationDetails;
