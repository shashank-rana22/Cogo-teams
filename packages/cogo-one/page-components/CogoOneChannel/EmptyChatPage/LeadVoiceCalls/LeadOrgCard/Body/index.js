import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({ eachItem = {} }) {
	const { name = 'User', mobile_number = '', mobile_country_code = '' } = eachItem || {};
	console.log('mobile_country_code', mobile_country_code);
	console.log('mobile_number', mobile_number);

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={styles.name_flex}>
					<Avatar src={GLOBAL_CONSTANTS.image_url.user_logo} size="45px" alt="img" />
					<div className={styles.name}>{startCase(name)}</div>
					<IcCFtick className={styles.tick_icon} />
				</div>
				<div className={styles.call_icon_border}>
					<IcMCall className={styles.call_icon} />
				</div>
			</div>
		</div>
	);
}

export default Body;
