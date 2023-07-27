import { Popover, ButtonGroup, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const BUTTON_OPTIONS = [
	{
		children : 'View Shipments',
		onClick  : () => {
			Toast.info('viewing Shipments');
		},
	},
	{
		children : 'View Documents',
		onClick  : () => {
			Toast.info('viewing Documents');
		},
	},
	{
		children : 'Re-Assign Agent',
		onClick  : () => {
			Toast.info('Re assigning agent');
		},
	},
];

function HeaderBlock({ shipmentItem = {}, setShowPocDetails = () => {} }) {
	const { serial_id = '', importer_exporter = {} } = shipmentItem || {};
	const { business_name = '', short_name = '' } = importer_exporter || {};

	return (
		<div className={styles.container}>
			<div className={styles.shipper_details}>
				<div className={styles.sid_id}>{`SID: ${serial_id}`}</div>

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
					onClick={() => setShowPocDetails(shipmentItem)}
				/>

				<Popover
					placement="bottom-end"
					caret={false}
					render={(
						<ButtonGroup
							size="sm"
							options={BUTTON_OPTIONS}
							direction="vertical"
						/>
					)}
				>
					<IcMOverflowDot
						height="20px"
						width="20px"
						cursor="pointer"
					/>
				</Popover>
			</div>

		</div>
	);
}

export default HeaderBlock;
