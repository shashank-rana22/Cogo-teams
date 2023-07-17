import { Tooltip } from '@cogoport/components';
import { Image } from '@cogoport/next';

import { SHIPPING_LINE } from '../../../../constants/getShippingLines';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

// const GET_LAST_STRING = 2;

function ShipmentDetails({ serviceData = {}, name = '' }) {
	// const parts = name.split(':');
	// const evnetTitle = parts[GET_LAST_STRING].trim();

	const shippingLineMapping = SHIPPING_LINE[serviceData?.shipment_type];
	const shippingLines = serviceData[shippingLineMapping];

	return (
		<>
			<div className={styles.title}>{name}</div>
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
