import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function HandleLocationDetails({ location = {} }) {
	const {
		port_code = '',
		postal_code = '',
		country_code = '',
		name = '',
		display_name = '',
	} = location || {};

	return (
		<>
			<div className={styles.port_code}>
				<div className={`${styles.code} core_ui_port_code`}>
					{port_code || postal_code}
				</div>

				<div className={`${styles.country} core_ui_country_code`}>
					{country_code}
				</div>
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				interactive
				content={display_name}
			>
				<div className={`${styles.ellipsis_text} core_ui_loaction_name`}>
					{name}
				</div>
			</Tooltip>
		</>
	);
}

export default HandleLocationDetails;
