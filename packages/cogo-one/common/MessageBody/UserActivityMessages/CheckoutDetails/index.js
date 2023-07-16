import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';

import { SHIPPING_LINE } from '../../../../constants/getShippingLines';
// import { convertCurrencyValue } from '../../../../utils/convertCurrencyValue';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

const GET_LAST_STRING = 2;

function ShipmentDetails({ serviceData = {}, name = '' }) {
	const {
		detail = {}, rate = {},
		//  currency_conversions = {}
	} = serviceData || {};

	const {
		primary_service = '',
		services = {},
	} = detail || {};

	// const total = 0;
	// const value = Number(totalDisplay.toFixed(4));
	// total += convertCurrencyValue(
	// 	Number(totalDisplay.toFixed(4)),
	// 	item?.tax_total_price_currency,
	// 	rate?.total_price_currency,
	// 	conversions,
	// );

	const primaryService = Object.values(services || {}).find(
		(service) => service?.service_type === primary_service || !service?.trade_type,
	);
	console.log('primaryService:', primaryService);

	const shippingLineMapping = SHIPPING_LINE[primary_service];
	const shippingLines = primaryService[shippingLineMapping];

	// const { shipping_line = {}, airline = {} } = primaryService;

	const parts = name.split(':');
	const evnetTitle = parts[GET_LAST_STRING].trim();

	return (
		<>
			<div className={styles.title}>{evnetTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned checkout -
			</div>

			<div className={styles.banner}>
				{shippingLines && (
					<div className={styles.company_details}>
						<Image
							src={shippingLines?.logo_url}
							alt="status-icon"
							width={30}
							height={30}
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
					amount   : rate?.total_price,
					currency : rate?.total_price_currency,
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
