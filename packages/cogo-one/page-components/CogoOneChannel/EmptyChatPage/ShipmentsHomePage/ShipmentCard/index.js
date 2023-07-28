import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import { iconMapping } from './iconsMapping';
import PocContainer from './PocContainer';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

const handleShipmentClick = ({
	importerExporterPoc = {},
	setActiveTab = () => {},
}) => {
	const {
		id: userId = '',
		name = '',
		email = '',
		mobile_country_code: mobileCountryCode = '',
		mobile_number = '',
	} = importerExporterPoc || {};

	const countryCode = mobileCountryCode.replace('+', '');

	setActiveTab((prev) => ({
		...prev,
		hasNoFireBaseRoom : true,
		data              : {
			user_id                 : userId,
			user_name               : name,
			whatsapp_number_eformat : `+${countryCode}${mobile_number}`,
			email,
			channel_type            : 'whatsapp',
			countryCode,
			mobile_no               : `${countryCode}${mobile_number}`,
		},
		tab: 'message',
	}));
};

function ShipmentCard({
	shipmentItem = {},
	showPocDetails = {},
	setShowPocDetails = () => {},
	setActiveTab = () => {},
}) {
	const {
		shipment_type = '',
		serial_id = '',
		net_total = 0,
		net_total_price_currency = '',
		importer_exporter_poc: importerExporterPoc = {},
		payment_term : paymentTerm = '',
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
			<div className={styles.main_block}>
				<HeaderBlock
					shipmentItem={shipmentItem}
					setShowPocDetails={setShowPocDetails}
				/>

				<ShippingRoute
					shipmentItem={shipmentItem}
				/>

				<CargoDetails
					detail={shipmentItem}
					service={shipment_type}
				/>

				<div className={styles.price_details}>
					<div className={styles.amount}>
						{formatAmount({
							amount   : net_total,
							currency : net_total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
								minimumFractionDigits : 2,
							},
						})}
					</div>

					{paymentTerm ? (
						<Pill size="md" color="#BBFCBD">
							{paymentTerm }
						</Pill>
					) : null}
				</div>
			</div>

			<div className={styles.footer_block}>
				<div className={styles.footer_left_block}>
					<Pill size="md" color="#CFEAED">
						Booking Placed
					</Pill>
				</div>

				<div className={styles.footer_right_block}>
					Next: Booking Confirmation
				</div>
			</div>

			<div className={styles.shipment_type_container}>
				{iconMapping?.[shipment_type]}

				{startCase(shipment_type)}
			</div>
		</div>
	);
}

export default ShipmentCard;
