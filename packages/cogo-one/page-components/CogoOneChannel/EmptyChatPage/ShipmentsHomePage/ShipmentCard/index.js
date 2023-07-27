import { Pill } from '@cogoport/components';
import { Image } from '@cogoport/next';
import React from 'react';

import CargoDetails from '../../../../../common/MessageBody/UserActivityMessages/Shipments/CargoDetails';

import HeaderBlock from './HeaderBlock';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentCard({ shipmentItem = {} }) {
	const { service_provider = {} } = shipmentItem;
	const { bussiness_name = '', short_name = '' } = service_provider;

	return (
		<div className={styles.container}>
			<div className={styles.main_block}>
				<HeaderBlock shipmentItem={shipmentItem} />

				<div className={styles.service_provider_details}>
					<Image
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/logo.svg"
						height={50}
						width={50}
						alt="shipping"
						className={styles.logo_styles}
					/>

					<div className={styles.service_provider_name}>
						{bussiness_name || short_name}
					</div>
				</div>

				<ShippingRoute shipmentItem={shipmentItem} />

				<CargoDetails detail={shipmentItem} service="shipment_type" />
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
