import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';

import { SHIPPING_LINE, EVENT_LABEL } from '../../../../constants/shippingLineMappings';
import { getEventTitle } from '../../../../utils/getEventTitle';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
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
		spot_search : detail?.search_type,
	};

	const SERVICE_MAPPING = {
		checkout    : 'service_type',
		shipment    : 'shipment_type',
		spot_search : 'search_type',
	};

	const SID_MAPPING = {
		shipment    : serviceData?.serial_id,
		spot_search : detail?.serial_id,
		checkout    : primaryService?.serial_id,
	};

	const SERIAL_ID_LABEL = {
		checkout    : 'Checkout Id',
		shipment    : 'SID',
		spot_search : 'Spot Search Id',
	};

	const lineType = SHIPPING_LINE_MAPPING[eventType];
	const shippingLineMapping = SHIPPING_LINE[lineType] || '';
	const matchShippingLine = SERVICE_DETAILS[eventType] || {};
	const shippingLines = matchShippingLine[shippingLineMapping] || {};
	const { logo_url = '', business_name = '' } = shippingLines || {};

	if (isEmpty(serviceData)) {
		return (
			<>
				<div className={styles.title}>{startCase(eventTitle)}</div>
				<div className={styles.message}>
					Following are the details of the abandoned
					{' '}
					{EVENT_LABEL[eventType]}
					{' '}
					-
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.title}>{startCase(eventTitle)}</div>
			<div className={styles.message}>
				Following are the details of the abandoned
				{' '}
				{EVENT_LABEL[eventType]}
				{' '}
				-
			</div>

			<div className={styles.banner}>
				{!isEmpty(shippingLines) && (
					<div className={styles.company_details}>
						{logo_url ? (
							<img
								src={logo_url}
								alt="status-icon"
								width="30px"
								height="25px"
							/>
						) : null}

						<Tooltip
							content={business_name}
							placement="bottom"
						>
							<div className={styles.company_name}>
								{business_name}
							</div>
						</Tooltip>
					</div>
				)}

				{SID_MAPPING[eventType] ? (
					<div className={styles.serial_id}>
						{SERIAL_ID_LABEL[eventType]}
						{' '}
						:
						<div className={styles.id_number}>{SID_MAPPING[eventType]}</div>
					</div>
				) : null}

				{lineType ? (
					<div className={styles.service_type}>
						Service Type :
						<div className={styles.type}>{startCase(lineType)}</div>
					</div>
				) : null}

				<PortDetails serviceData={SERVICE_DETAILS[eventType]} service={SERVICE_MAPPING[eventType]} />
				<CargoDetails detail={SERVICE_DETAILS[eventType]} service={SERVICE_MAPPING[eventType]} />
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
