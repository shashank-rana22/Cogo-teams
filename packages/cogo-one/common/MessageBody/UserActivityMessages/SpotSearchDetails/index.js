import { Tooltip } from '@cogoport/components';

import { SHIPPING_LINE } from '../../../../constants/getShippingLines';
import { getEventTitle } from '../../../../utils/getEventTitle';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

function SpotSearchDetails({ serviceData = {}, name = '' }) {
	const { detail = {} } = serviceData || {};

	const eventTitle = getEventTitle({ name });

	const shippingLineMapping = SHIPPING_LINE[serviceData?.shipment_type];
	const shippingLines = serviceData[shippingLineMapping];

	return (
		<>
			<div className={styles.title}>{eventTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned Spot Search -
			</div>

			<div className={styles.banner}>
				{shippingLines && (
					<div className={styles.company_details}>
						{shippingLines?.logo_url && (
							<img // getting other hostname images
								src={shippingLines?.logo_url}
								alt="status-icon"
								width="30px"
								height="25px"
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
					{detail?.serial_id}
				</div>
				<PortDetails serviceData={detail} />
				<CargoDetails detail={detail} />
			</div>
		</>
	);
}

export default SpotSearchDetails;
