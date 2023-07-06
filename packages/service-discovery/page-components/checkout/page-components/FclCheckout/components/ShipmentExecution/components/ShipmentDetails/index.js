import { useContext } from 'react';

import ContainerDetails from '../../../../../../../../common/ContainerDetails';
import LocationDetails from '../../../../../../../../common/LocationDetails';
import { CheckoutContext } from '../../../../../../context';
import ShippingLineDetails from '../../../PreviewBooking/components/BookingPreview/BookingDetails/ShippingLineDetails';

import styles from './styles.module.css';

function ShipmentDetails() {
	const {
		detail = {},
		rate = {},
	} = useContext(CheckoutContext);

	const { services = {}, primary_service, serial_id = '' } = detail;

	const mainServiceObject = Object.values(services).find((item) => item.service_type	=== primary_service);

	const { shipping_line = {} } = mainServiceObject || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Shipment Details</div>

			<div className={styles.details_div}>
				<div className={styles.main_content}>
					<div>
						ID:
						{serial_id}
					</div>

					<ShippingLineDetails shipping_line={shipping_line} />

					<LocationDetails data={mainServiceObject} />

					<ContainerDetails primary_service={primary_service} services={services} />
				</div>
			</div>
		</div>
	);
}

export default ShipmentDetails;
