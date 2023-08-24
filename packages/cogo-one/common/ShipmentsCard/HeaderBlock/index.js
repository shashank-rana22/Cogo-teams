import { Popover, ButtonGroup, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMCopy, IcMAgentManagement, IcMLiveChat } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import handleCopyShipmentData from '../../../helpers/handleCopyShipmentData';
import RaiseTicketModal from '../../RaiseTicketModal';

import styles from './styles.module.css';

const getButtonOptions = ({
	partnerId, shipmentId, setShowRaiseTicket,
	setShowPocModal, setShowPopover, shipmentItem,
	showAddPrimaryUserButton = false,
}) => [
	{
		key      : 'view_shipments',
		children : 'View Shipments',
		onClick  : (e) => {
			e.stopPropagation();
			const shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${shipmentId}`;
			window.open(shipmentDetailsPage, '_blank');
			setShowPopover('');
		},
		condition : ['all_shipments', 'user_shipments'],
		show      : true,
	},
	{
		key      : 'view_documents',
		children : 'View Documents',
		onClick  : (e) => {
			e.stopPropagation();
			const shipmentDocuments = `${window.location.origin}/${partnerId}/shipments/${shipmentId}?tab=documents`;
			window.open(shipmentDocuments, '_blank');
			setShowPopover('');
		},
		condition : ['all_shipments', 'user_shipments'],
		show      : true,
	},
	{
		key      : 'raise_ticket',
		children : 'Raise Ticket',
		onClick  : (e) => {
			e.stopPropagation();
			setShowRaiseTicket(true);
			setShowPopover('');
		},
		condition : ['user_shipments'],
		show      : true,
	},
	{
		key      : 'add_primary_poc',
		children : 'Set Primary Poc',
		onClick  : (e) => {
			e.stopPropagation();
			setShowPocModal({ show: true, shipmentData: shipmentItem });
			setShowPopover('');
		},
		condition : ['all_shipments', 'user_shipments'],
		show      : showAddPrimaryUserButton,
	},
];

function HeaderBlock({
	shipmentItem = {}, setShowPocDetails = () => {},
	type = '', setShowPopover = () => {}, showPopover = '',
	setShowPocModal = () => {},
	showAddPrimaryUserButton = false,
	handleShipmentChat = () => {},
}) {
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
		setShowPocModal,
		setShowPopover,
		shipmentItem,
		showAddPrimaryUserButton,
	});

	const filteredButtons = buttons.filter((itm) => itm?.condition.includes(type) && itm?.show);

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

				{type === 'all_shipments' ? (
					<Tooltip content="Poc's" placement="bottom">
						<IcMAgentManagement
							className={styles.poc_details}
							onClick={(e) => {
								e.stopPropagation();
								setShowPocDetails(shipmentItem);
							}}
						/>
					</Tooltip>
				) : null}

				<Tooltip content="Chat" placement="bottom">
					<IcMLiveChat
						className={styles.message_icon_styles}
						onClick={(e) => {
							e.stopPropagation();
							handleShipmentChat({ shipmentItem });
						}}
					/>
				</Tooltip>

				<Tooltip content="Copy" placement="bottom">
					<IcMCopy
						className={styles.copy_icon}
						onClick={(e) => {
							e.stopPropagation();
							handleCopyShipmentData({ shipmentItem });
						}}
					/>
				</Tooltip>

				<Popover
					placement="bottom-end"
					caret={false}
					visible={showPopover === shipmentId}
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
							setShowPopover(shipmentId);
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
