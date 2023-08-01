import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';

import { SHIPPING_LINE } from '../../../../constants/shippingLineMappings';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Shipments({ serviceData = {}, eventType = '', scope = '' }) {
	const activityPlatform = startCase(scope) || '';

	const EVENTS_INFORMATION = {
		checkout: {
			title       : `Customer Has Not Proceeded With the Checkout Process on ${activityPlatform} platform`,
			information : `Please contact the customer to understand their
			 concerns and help them to complete the checkout. 
			Here are the details of the shipment checkout that has been abandoned by the customer - `,
		},
		shipment: {
			title       : `Customer Has Proceeded with Shipemnt on ${activityPlatform} platform`,
			information : 'Here are the details of the shipment -',
		},

		spot_search: {
			title: `Customer Has Not Proceeded With Shipment After 
			Performing A Spot Search on ${activityPlatform} platform`,
			information: `Please contact the customer to understand their 
			concerns and help them to proceed with the next steps. Here are the details of the spot search - `,
		},

	};

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
				<div className={styles.title}>{EVENTS_INFORMATION[eventType]?.title}</div>
				<div className={styles.message}>
					{EVENTS_INFORMATION[eventType]?.information}
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.title}>{EVENTS_INFORMATION[eventType]?.title}</div>
			<div className={styles.message}>
				{EVENTS_INFORMATION[eventType]?.information}
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
