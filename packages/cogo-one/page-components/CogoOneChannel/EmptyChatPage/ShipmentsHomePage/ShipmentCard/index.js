import { Pill, Avatar } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import PocContainer from './PocContainer';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentCard({
	shipmentItem = {},
	showPocDetails = {},
	setShowPocDetails = () => {},
}) {
	const { service_provider = {} } = shipmentItem;
	const { bussiness_name = '', short_name = '' } = service_provider;

	if (!isEmpty(showPocDetails) && showPocDetails?.sid === shipmentItem.sid) {
		return (
			<div className={styles.container}>
				<PocContainer
					showPocDetails={showPocDetails}
					setShowPocDetails={setShowPocDetails}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_block}>
				<HeaderBlock shipmentItem={shipmentItem} setShowPocDetails={setShowPocDetails} />

				<div className={styles.service_provider_details}>
					<Avatar size={50} personName={bussiness_name || short_name} />

					<div className={styles.service_provider_name}>
						{bussiness_name || short_name}
					</div>
				</div>

				<ShippingRoute shipmentItem={shipmentItem} />

				<CargoDetails detail={shipmentItem} service="shipment_type" />

				<div className={styles.price_details}>
					<div className={styles.amount}>
						INR 67,000
					</div>
					<Pill size="md" color="#BBFCBD">
						Pay Later
					</Pill>
				</div>
			</div>

			<div className={styles.footer_block}>
				<div className={styles.footer_left_block}>
					<Pill size="md" color="#4BAE4F">
						Booking Placed
					</Pill>
				</div>

				<div className={styles.footer_right_block}>
					Next: Booking Confirmation
				</div>
			</div>
		</div>
	);
}

export default ShipmentCard;
