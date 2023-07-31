import { Popover, ButtonGroup, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMCopy } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import handleCopyShipmentData from '../../../helpers/handleCopyShipmentData';
import RaiseTicketModal from '../../RaiseTicketModal';

import styles from './styles.module.css';

const getButtonOptions = ({ partnerId, shipmentId, setShowRaiseTicket }) => [
	{
		children : 'View Shipments',
		onClick  : (e) => {
			e.stopPropagation();
			const redirectUrl = `${window.location.origin}/${partnerId}/shipments/${shipmentId}`;
			window.open(redirectUrl, '_blank');
		},
		condition: ['all_shipments', 'user_shipments'],
	},
	{
		children : 'View Documents',
		onClick  : (e) => {
			e.stopPropagation();
			const redirectUrl = `${window.location.origin}/${partnerId}/shipments/${shipmentId}?tab=documents`;
			window.open(redirectUrl, '_blank');
		},
		condition: ['all_shipments', 'user_shipments'],
	},
	{
		children : 'Raise Ticket',
		onClick  : (e) => {
			e.stopPropagation();
			setShowRaiseTicket(true);
		},
		condition: ['user_shipments'],
	},
];

function HeaderBlock({ shipmentItem = {}, setShowPocDetails = () => {}, type = '' }) {
	const { partnerId = '', userId = '' } = useSelector(({ profile }) => ({
		partnerId : profile.partner.id,
		userId    : profile.user.id,
	}));

	const [showRaiseTicket, setShowRaiseTicket] = useState(false);

	const {
		serial_id = '',
		importer_exporter = {},
		id: shipmentId = '',
		shipment_type = '',
		trade_type = '',
		importer_exporter_id = '',
	} = shipmentItem || {};

	const { business_name = '' } = importer_exporter || {};

	const SHIPMENT_FORMATTED_DATA = {
		category     : shipment_type,
		sub_category : trade_type,
		shipment_id  : serial_id,
		user_id      : userId,
		importer_exporter_id,
	};

	const buttons = getButtonOptions({ shipmentId, partnerId, setShowRaiseTicket });

	const filteredButtons = buttons.filter((itm) => itm?.condition.includes(type));

	const handleSidClick = (e) => {
		e.stopPropagation();
		const redirectUrl = `${window.location.origin}/${partnerId}/shipments/${shipmentId}`;
		window.open(redirectUrl, '_blank');
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.shipper_details}
				onClick={(e) => e.stopPropagation()}
				role="presentation"
			>
				<div
					className={styles.sid_id}
					role="presentation"
					onClick={(e) => handleSidClick(e)}
				>
					{`SID: ${serial_id}`}
				</div>

				<div className={styles.importer_exporter_styles}>
					{business_name || '-'}
				</div>
			</div>

			<div className={styles.icons_container}>
				<IcMCopy
					className={cl`${styles.copy_icon} 
					${type !== 'all_shipments' ? styles.user_activity_copy_icon : ''}`}
					onClick={(e) => {
						e.stopPropagation();
						handleCopyShipmentData({ shipmentItem });
					}}
				/>

				{type === 'all_shipments' && (
					<Image
						src={GLOBAL_CONSTANTS.image_url.message_reply}
						height={25}
						width={25}
						alt="message"
						className={styles.message_icon_styles}
						onClick={(e) => {
							e.stopPropagation();
							setShowPocDetails(shipmentItem);
						}}
					/>
				)}

				<Popover
					placement="bottom-end"
					caret={false}
					render={(
						<ButtonGroup
							size="sm"
							options={filteredButtons}
							direction="vertical"
						/>
					)}
				>
					<IcMOverflowDot
						className={styles.overflow_container}
						onClick={(e) => e.stopPropagation()}
					/>
				</Popover>
			</div>

			<RaiseTicketModal
				shipmentData={SHIPMENT_FORMATTED_DATA}
				setShowRaiseTicket={setShowRaiseTicket}
				showRaiseTicket={showRaiseTicket}
			/>

		</div>
	);
}

export default HeaderBlock;
