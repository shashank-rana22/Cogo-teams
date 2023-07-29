import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ShipmentsCard from '../../../../../common/ShipmentsCard';

import PocContainer from './PocContainer';
import styles from './styles.module.css';

const handleShipmentClick = ({
	importerExporterPoc = {},
	setActiveTab = () => {},
}) => {
	const {
		id: userId = '',
		name = '',
		email = '',
		mobile_country_code = '',
		mobile_number = '',
	} = importerExporterPoc || {};

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
}) {
	const {
		serial_id = '',
		importer_exporter_poc: importerExporterPoc = {},
	} = shipmentItem;

	if (!isEmpty(showPocDetails) && showPocDetails?.serial_id === serial_id) {
		return (
			<div className={styles.container}>
				<PocContainer
					showPocDetails={showPocDetails}
					setShowPocDetails={setShowPocDetails}
					setActiveTab={setActiveTab}
				/>
			</div>
		);
	}

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => handleShipmentClick({ importerExporterPoc, setActiveTab })}
		>
			<ShipmentsCard
				setShowPocDetails={setShowPocDetails}
				shipmentItem={shipmentItem}
				type="all_shipments"
			/>
		</div>
	);
}

export default ShipmentCard;
