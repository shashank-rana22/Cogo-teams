import { Popover, ButtonGroup } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import styles from './styles.module.css';

const getButtonOptions = ({ partnerId, shipmentId }) => [
	{
		children : 'View Shipments',
		onClick  : () => {
			const redirectUrl = `${window.location.origin}/v2/${partnerId}/shipments/${shipmentId}`;
			window.open(redirectUrl, '_blank');
		},
	},
	{
		children : 'View Documents',
		onClick  : () => {
			const redirectUrl = `${window.location.origin}/v2/${partnerId}/shipments/${shipmentId}?tab=documents`;
			window.open(redirectUrl, '_blank');
		},
	},
];

function HeaderBlock({ shipmentItem = {}, setShowPocDetails = () => {} }) {
	const { partnerId = '' } = useSelector(({ profile }) => ({ partnerId: profile.partner.id }));

	const { serial_id = '', importer_exporter = {}, id: shipmentId = '' } = shipmentItem || {};
	const { business_name = '' } = importer_exporter || {};

	return (
		<div className={styles.container}>
			<div className={styles.shipper_details}>
				<div className={styles.sid_id}>{`SID: ${serial_id}`}</div>

				<div className={styles.importer_exporter_styles}>
					{business_name || '-'}
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
							options={getButtonOptions({ shipmentId, partnerId })}
							direction="vertical"
						/>
					)}
				>
					<IcMOverflowDot
						height="18px"
						width="18px"
						cursor="pointer"
					/>
				</Popover>
			</div>

		</div>
	);
}

export default HeaderBlock;
