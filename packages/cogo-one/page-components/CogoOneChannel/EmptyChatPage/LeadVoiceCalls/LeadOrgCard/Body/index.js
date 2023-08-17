import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Body({ eachItem = {} }) {
	const { name = 'User', mobile_number = '', mobile_country_code = '' } = eachItem || {};
	console.log('mobile_country_code', mobile_country_code);
	console.log('mobile_number', mobile_number);

	return (
		<div className={styles.body}>
			<div className={styles.name_flex}>
				<Avatar src={GLOBAL_CONSTANTS.user_avatar} size="40px" alt="img" />
				<div className={styles.name}>{startCase(name)}</div>
			</div>
		</div>
	);
}

export default Body;
