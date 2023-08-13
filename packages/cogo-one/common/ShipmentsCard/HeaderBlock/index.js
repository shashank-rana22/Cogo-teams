import { Popover, ButtonGroup, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMCopy } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import handleCopyShipmentData from '../../../helpers/handleCopyShipmentData';
import RaiseTicketModal from '../../RaiseTicketModal';

import styles from './styles.module.css';

const getButtonOptions = ({
	partnerId,
	shipmentId,
	setShowRaiseTicket,
	setShowBookingNote = () => {},
	taskStatus = '',
	documents = [],
	setPopoverVisible = () => {},
}) => [
	{
		children : 'View Shipments',
		onClick  : (e) => {
			e.stopPropagation();
			const shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${shipmentId}`;
			window.open(shipmentDetailsPage, '_blank');
		},
		condition: ['all_shipments', 'user_shipments'],
	},
	{
		children : 'View Documents',
		onClick  : (e) => {
			e.stopPropagation();
			const shipmentDocuments = `${window.location.origin}/${partnerId}/shipments/${shipmentId}?tab=documents`;
			window.open(shipmentDocuments, '_blank');
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
	{
		children : 'Show Booking Note',
		onClick  : (e) => {
			e.stopPropagation();
			setShowBookingNote({ show: true, data: { documents, shipmentId } });
			setPopoverVisible(false);
		},
		condition : ['all_shipments'],
		hide      : taskStatus !== 'approve_booking_note',
	},
];

function HeaderBlock({
	shipmentItem = {},
	setShowPocDetails = () => {},
	type = '',
	setShowBookingNote = () => {},
}) {
	const { partnerId = '', userId = '' } = useSelector(({ profile }) => ({
		partnerId : profile.partner.id,
		userId    : profile.user.id,
	}));

	const [showRaiseTicket, setShowRaiseTicket] = useState(false);
	const [popoverVisible, setPopoverVisible] = useState(false);

	const {
		serial_id = '',
		importer_exporter = {},
		id: shipmentId = '',
		shipment_type = '',
		trade_type = '',
		importer_exporter_id = '',
		documents = [],
		task_status = '',
	} = shipmentItem || {};

	const { business_name = '' } = importer_exporter || {};

	const SHIPMENT_FORMATTED_DATA = {
		service     : shipment_type,
		shipment_id : serial_id,
		user_id     : userId,
		trade_type,
		importer_exporter_id,
	};

	const buttons = getButtonOptions({
		shipmentId,
		partnerId,
		setShowRaiseTicket,
		setShowBookingNote,
		taskStatus: task_status,
		documents,
		setPopoverVisible,
	});

	const filteredButtons = buttons.filter((itm) => !itm?.hide && itm?.condition.includes(type));

	const handleSidClick = (e) => {
		e.stopPropagation();
		const shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${shipmentId}`;
		window.open(shipmentDetailsPage, '_blank');
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
					onClick={handleSidClick}
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
					visible={popoverVisible}
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
						onClick={(e) => {
							e.stopPropagation();
							setPopoverVisible((p) => !p);
						}}
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
