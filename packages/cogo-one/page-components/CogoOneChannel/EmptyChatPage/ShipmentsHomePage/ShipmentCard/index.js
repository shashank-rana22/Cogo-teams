import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ShipmentsCard from '../../../../../common/ShipmentsCard';

import PocContainer from './PocContainer';
import styles from './styles.module.css';

const handleShipmentClick = ({
	importerExporterPoc = {},
	setActiveTab = () => {},
	primaryPocDetails = {},
	params = {},
	range = '',
}) => {
	const { query = '', shipmentType = '' } = params || {};

	const newHashUrl = `sid=${query}${shipmentType ? `&shipmentType=${shipmentType}` : ''}
	${range && range !== 'custom' ? `&range=${range}` : ''}`;

	window.location.hash = newHashUrl;

	const activeUserChat = !isEmpty(primaryPocDetails) ? primaryPocDetails : importerExporterPoc;

	const {
		id: userId = '',
		name = '',
		email = '',
		mobile_country_code = '',
		mobile_number = '',
	} = activeUserChat || {};

	const chatData = {
		user_id                 : userId,
		user_name               : name,
		whatsapp_number_eformat : mobile_number,
		email,
		channel_type            : 'whatsapp',
		countryCode             : mobile_country_code,
		mobile_no               : `${mobile_country_code.replace('+', '')}${mobile_number}`,
	};

	setActiveTab((prev) => ({
		...prev,
		hasNoFireBaseRoom : true,
		data              : chatData,
		tab               : 'message',
	}));
};

function ShipmentCard({
	shipmentItem = {},
	showPocDetails = {},
	setShowPocDetails = () => {},
	setActiveTab = () => {},
	setShowBookingNote = () => {},
	key = '',
	setShowShipmentChat = () => {},
	setShowPopover = () => {},
	showPopover = '',
	setShowPocModal = () => {},
	showAddPrimaryUserButton = false,
	mailProps = {},
	params = {},
	range = '',
}) {
	const {
		serial_id = '',
		importer_exporter_poc: importerExporterPoc = {},
		primary_poc_details: primaryPocDetails = {},
	} = shipmentItem;

	const handleShipmentChat = ({ shipmentDetails }) => {
		setShowShipmentChat(shipmentDetails);
	};

	if (!isEmpty(showPocDetails) && showPocDetails?.serial_id === serial_id) {
		return (
			<div className={styles.container} key={key}>
				<PocContainer
					showPocDetails={showPocDetails}
					setShowPocDetails={setShowPocDetails}
					setActiveTab={setActiveTab}
					handleShipmentChat={handleShipmentChat}
					mailProps={mailProps}
				/>
			</div>
		);
	}

	return (
		<div
			role="presentation"
			className={styles.container}
			key={key}
			onClick={() => handleShipmentClick({
				importerExporterPoc,
				primaryPocDetails,
				setActiveTab,
				params,
				range,
			})}
		>
			<ShipmentsCard
				setShowPocDetails={setShowPocDetails}
				shipmentItem={shipmentItem}
				type="all_shipments"
				setShowBookingNote={setShowBookingNote}
				setShowPopover={setShowPopover}
				showPopover={showPopover}
				setShowPocModal={setShowPocModal}
				showAddPrimaryUserButton={showAddPrimaryUserButton}
				handleShipmentChat={handleShipmentChat}
			/>
		</div>
	);
}

export default ShipmentCard;
