import { Popover, ButtonGroup, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMCopy, IcMAgentManagement } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import handleCopyShipmentData from '../../../helpers/handleCopyShipmentData';
import RaiseTicketModal from '../../RaiseTicketModal';

import styles from './styles.module.css';

const ROUTES_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

const getButtonOptions = ({
	setShowRaiseTicket,
	setShowPocModal, setShowPopover, shipmentItem,
	showAddPrimaryUserButton = false,
	handleRowClick = () => {},
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
];

function HeaderBlock({
	shipmentItem = {}, setShowPocDetails = () => {},
	type = '', setShowPopover = () => {}, showPopover = '',
	setShowPocModal = () => {},
	showAddPrimaryUserButton = false,
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

				{type === 'all_shipments' ? (
					<Tooltip content="POCs" placement="bottom">
						<IcMAgentManagement
							className={styles.poc_details}
							onClick={(e) => {
								e.stopPropagation();
								setShowPocDetails(shipmentItem);
							}}
						/>
					</Tooltip>
				) : null}

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
