import { Popover, ButtonGroup, Tooltip, cl } from '@cogoport/components';
import { IcMOverflowDot, IcMCopy, IcMAgentManagement, IcMLiveChat } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import handleCopyShipmentData from '../../../helpers/handleCopyShipmentData';
import RaiseTicketModal from '../../RaiseTicketModal';

import styles from './styles.module.css';

const ROUTES_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

const getButtonOptions = ({
	setShowRaiseTicket = () => {},
	setShowPocModal = () => {},
	setShowPopover = () => {},
	shipmentItem = {},
	showAddPrimaryUserButton = false,
	handleRowClick = () => {},
	setActiveTab = () => {},
	sid = '',
	showModalType = () => {},
}) => [
	{
		key      : 'view_shipments',
		children : 'View Shipments',
		onClick  : (e) => {
			handleRowClick({ e });
			setShowPopover('');
		},
		condition : ['all_shipments', 'user_shipments'],
		show      : true,
	},
	{
		key      : 'view_documents',
		children : 'View Documents',
		onClick  : (e) => {
			handleRowClick({ e, activeTab: 'documents' });
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
	{
		key      : 'show_notes_modal',
		children : 'Notes',
		onClick  : (e) => {
			e.stopPropagation();
			showModalType({ modalType: 'show_notes_modal', shipmentData: shipmentItem });
			setShowPopover('');
		},
		condition : ['all_shipments'],
		show      : true,
	},
	{
		key      : 'open_emails',
		children : 'Open Emails',
		onClick  : (e) => {
			e.stopPropagation();
			setActiveTab((prev) => ({
				...prev,
				data          : {},
				tab           : 'firebase_emails',
				subTab        : 'hidden_filter',
				hiddenFilters : { sid },
			}));
			setShowPopover('');
		},
		condition : ['all_shipments'],
		show      : true,
	},
];

function HeaderBlock({
	shipmentItem = {},
	setShowPocDetails = () => {},
	type = '',
	setShowPopover = () => {},
	showPopover = '',
	setShowPocModal = () => {},
	viewType = '',
	handleShipmentChat = () => {},
	setActiveTab = () => {},
	showModalType = () => {},
}) {
	const { partnerId = '', userId = '' } = useSelector(({ profile }) => ({
		partnerId : profile.partner.id,
		userId    : profile.user.id,
	}));

	const [showRaiseTicket, setShowRaiseTicket] = useState(false);

	const showAddPrimaryUserButton = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page;
	const showShipmentsStakeholdersContactDetails = VIEW_TYPE_GLOBAL_MAPPING[viewType]
		?.permissions?.show_shipments_stakeholders_contact_details;

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

	const handleRowClick = ({ e, activeTab = '' }) => {
		e.stopPropagation();
		let shipmentDetailsPage;
		if (Object.keys(ROUTES_MAPPING).includes(shipment_type)) {
			const route = ROUTES_MAPPING[shipment_type];

			shipmentDetailsPage = `${window.location.origin}/v2/${partnerId}/booking/${route}/${shipmentId}`;
		} else {
			// eslint-disable-next-line max-len
			shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${shipmentId}${activeTab ? `?tab=${activeTab}` : ''}`;
		}

		window.open(shipmentDetailsPage, '_blank');
	};

	const buttons = getButtonOptions({
		shipmentId,
		partnerId,
		setShowRaiseTicket,
		setShowPocModal,
		setShowPopover,
		shipmentItem,
		showAddPrimaryUserButton,
		handleRowClick,
		setActiveTab,
		sid: serial_id,
		showModalType,
	});

	const filteredButtons = buttons.filter((itm) => itm?.condition.includes(type) && itm?.show);

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
					onClick={(e) => handleRowClick({ e })}
				>
					{`SID: ${serial_id}`}
				</div>

				<div className={styles.importer_exporter_styles}>
					{business_name || '-'}
				</div>
			</div>

			<div className={styles.icons_container}>

				{showShipmentsStakeholdersContactDetails ? (
					<Tooltip content="POCs" placement="bottom">
						<IcMAgentManagement
							className={cl`${styles.common_style} ${styles.poc_details}`}
							onClick={(e) => {
								e.stopPropagation();
								setShowPocDetails(shipmentItem);
							}}
						/>
					</Tooltip>
				) : null}

				{showShipmentsStakeholdersContactDetails ? (
					<Tooltip content="Chat" placement="bottom">
						<IcMLiveChat
							className={cl`${styles.common_style} ${styles.message_icon_styles}`}
							onClick={(e) => {
								e.stopPropagation();
								handleShipmentChat({ shipmentDetails: shipmentItem });
							}}
						/>
					</Tooltip>
				) : null}

				<Tooltip content="Copy" placement="bottom">
					<IcMCopy
						className={cl`${styles.common_style} ${styles.copy_icon}`}
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
							setShowPopover((prevShowPopover) => (prevShowPopover === shipmentId ? '' : shipmentId));
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
