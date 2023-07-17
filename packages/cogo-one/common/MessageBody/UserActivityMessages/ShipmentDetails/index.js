import { Tooltip } from '@cogoport/components';
import { Image } from '@cogoport/next';

import { SHIPPING_LINE } from '../../../../constants/getShippingLines';
import { getEventTitle } from '../../../../utils/getEventTitle';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

function ShipmentDetails({ serviceData = {}, name = '' }) {
	const eventTitle = getEventTitle({ name });

	const shippingLineMapping = SHIPPING_LINE[serviceData?.shipment_type];
	const shippingLines = serviceData[shippingLineMapping];

	return (
		<>
			<div className={styles.title}>{eventTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned shipments -
			</div>

			<div className={styles.banner}>
				{shippingLines && (
					<div className={styles.company_details}>
						{shippingLines?.logo_url && (
							<Image
								src={shippingLines?.logo_url}
								alt="status-icon"
								width={30}
								height={30}
							/>
						)}
						<Tooltip
							content={shippingLines?.business_name}
							placement="bottom"
						>
							<div className={styles.company_name}>
								{shippingLines?.business_name}
							</div>
						</Tooltip>
					</div>
				)}
				<div className={styles.serial_id}>
					SID:
					{' '}
					{serviceData?.serial_id}
				</div>
				<PortDetails serviceData={serviceData} />
				<CargoDetails detail={serviceData} />
			</div>
		</>
	);
}

export default ShipmentDetails;
