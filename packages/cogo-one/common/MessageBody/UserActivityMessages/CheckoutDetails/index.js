import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { SHIPPING_LINE } from '../../../../constants/getShippingLines';
import { getEventTitle } from '../../../../utils/getEventTitle';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

function ShipmentDetails({ serviceData = {}, name = '' }) {
	const eventTitle = getEventTitle({ name });

	const {
		detail = {}, rate = {},
	} = serviceData || {};

	const {
		primary_service = '',
		services = {},
	} = detail || {};

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);

	const shippingLineMapping = SHIPPING_LINE[primary_service];
	const shippingLines = primaryService[shippingLineMapping];

	return (
		<>
			<div className={styles.title}>{eventTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned checkout -
			</div>

			<div className={styles.banner}>
				{shippingLines && (
					<div className={styles.company_details}>
						<img // getting other hostname images
							src={shippingLines?.logo_url}
							alt="status-icon"
							width="30px"
							height="25px"
						/>

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

				<PortDetails serviceData={primaryService} />
				<CargoDetails detail={primaryService} />
			</div>

			<div className={styles.landed_cost}>
				Landed Cost
			</div>
			<div className={styles.landed_amount}>

				{formatAmount({
					amount   : rate?.tax_total_price,
					currency : rate?.tax_total_price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
						minimumFractionDigits : 2,
					},
				})}
			</div>
		</>
	);
}

export default ShipmentDetails;
