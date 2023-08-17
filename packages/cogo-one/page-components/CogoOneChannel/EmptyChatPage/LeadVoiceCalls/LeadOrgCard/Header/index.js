import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function Header({ eachItem = {} }) {
	const { lead_organization_details = {} } = eachItem || {};

	const { serial_id = '12', business_name = 'rahu' } = lead_organization_details || {};

	return (
		<div className={styles.header}>
			<div className={styles.header_name}>
				<div className={styles.org_id}>
					ID:
					{' '}
					{serial_id}
				</div>
				<div className={styles.business_name}>
					{business_name}
				</div>
			</div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.message_reply}
				height={25}
				width={25}
				alt="message"
				className={styles.message_icon_styles}
				onClick={(e) => {
					e.stopPropagation();
				}}
			/>
			<IcMOverflowDot
				className={styles.overflow_container}
				onClick={(e) => e.stopPropagation()}
			/>
		</div>
	);
}

export default Header;
