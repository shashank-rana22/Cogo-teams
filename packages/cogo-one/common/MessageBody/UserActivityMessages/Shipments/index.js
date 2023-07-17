import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { SHIPPING_LINE, SHOW_SID, EVENT_LABEL } from '../../../../constants/getShippingLines';
import { getEventTitle } from '../../../../utils/getEventTitle';
import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

function Shipments({ serviceData = {}, name = '', eventType = '' }) {
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

	const SERVICE_DETAILS = {
		checkout    : primaryService,
		shipment    : serviceData,
		spot_search : detail,
	};

	const SHIPPING_LINE_MAPPING = {
		checkout    : primary_service,
		shipment    : serviceData?.shipment_type,
		spot_search : serviceData?.search_type,
	};

	const SID_MAPPING = {
		shipment    : serviceData?.serial_id,
		spot_search : detail?.serial_id,
	};

	const lineType = SHIPPING_LINE_MAPPING[eventType];

	const shippingLineMapping = SHIPPING_LINE[lineType] || '';
	const matchShippingLine = SERVICE_DETAILS[eventType] || '';
	const shippingLines = matchShippingLine[shippingLineMapping] || '';

	return (
		<>
			<div className={styles.title}>{eventTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned
				{' '}
				{EVENT_LABEL[eventType]}
				{' '}
				-
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

				{(SHOW_SID || []).includes(eventType) && (
					<div className={styles.serial_id}>
						SID:
						{' '}
						{SID_MAPPING[eventType]}
					</div>
				)}

				<PortDetails serviceData={SERVICE_DETAILS[eventType]} />
				<CargoDetails detail={SERVICE_DETAILS[eventType]} />
			</div>

			{eventType === 'checkout' && (
				<>
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
			)}

		</>
	);
}

export default Shipments;
