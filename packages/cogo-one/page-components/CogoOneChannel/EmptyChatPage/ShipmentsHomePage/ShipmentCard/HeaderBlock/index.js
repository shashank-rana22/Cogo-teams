import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function HeaderBlock({ shipmentItem = {} }) {
	const { sid = '', importer_exporter = {} } = shipmentItem || {};
	const { business_name = '', short_name = '' } = importer_exporter || {};

	return (
		<div className={styles.container}>
			<div className={styles.shipper_details}>
				<div className={styles.sid_id}>{`SID: ${sid}`}</div>

				<div className={styles.importer_exporter_styles}>
					{business_name || short_name}
				</div>
			</div>

			<div className={styles.icons_container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.message_reply}
					height={25}
					width={25}
					alt="message"
				/>

				<IcMOverflowDot
					height="20px"
					width="20px"
					cursor="pointer"
				/>
			</div>

		</div>
	);
}

export default HeaderBlock;
