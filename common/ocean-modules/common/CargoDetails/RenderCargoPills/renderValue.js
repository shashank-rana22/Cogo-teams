import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOpenlink } from '@cogoport/icons-react';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const VOLUME_FACTOR = 166.67;
const PACKAGES_LENGTH_GREATER_THAN = 1;
const INCR_CERTIFICATE_BY = 1;
const CONTAINERS_COUNT = 1;
const TRUCKS_COUNT = 1;
const PACKAGES_COUNT = 1;
const CHARGEABLE_WEIGHT_UPTO_DECIMAL = 2;
const BUY_QUOTATION_RATE_UPTO_DECIMAL = 2;

const formatPocData = (pocDetails) => (
	<div>
		<div>{pocDetails?.name}</div>
		<div>
			{pocDetails?.mobile_country_code}
			-
			{pocDetails?.mobile_number}
		</div>
		<div>{pocDetails?.email}</div>
	</div>
);

const packageDetails = (packages, inputValue) => {
	if (packages?.length > PACKAGES_LENGTH_GREATER_THAN) {
		return (
			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div style={{ fontSize: '10px' }}>
						{(packages || []).map((item) => {
							const values = item
								? `${item.packages_count} Pkg, (${item?.length}cm X ${item?.width
								}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
								: '';
							return <div key={values}>{values}</div>;
						})}
					</div>
				)}
			>
				<div className="cargo-details-info">
					{`Package: ${inputValue} + ${packages.length - PACKAGES_LENGTH_GREATER_THAN} more`}

				</div>
			</Tooltip>
		);
	}

	return `Package: ${inputValue}`;
};

const formatShipperDetails = (shipperDetails) => (
	<div>
		<div>{shipperDetails?.name}</div>
		<div>{shipperDetails?.address}</div>
	</div>
);

const formatCertificate = (certificates) => (
	<div className={styles.certificate_container}>
		{(certificates || []).map((item, i) => (
			<a href={item} target="_blank" rel="noreferrer" key={item}>
				Click to view certificate
				&nbsp;
				{i + INCR_CERTIFICATE_BY}
			&nbsp;
				<IcMOpenlink />
				<br />
			</a>
		))}
	</div>
);

export const renderValue = (label, detail) => {
	const { packages = [] } = detail || {};

	const valueForInput = Array.isArray(packages) && packages?.length ? packages[GLOBAL_CONSTANTS.zeroth_index] : null;

	const chargableWeight = Math.max(detail.volume * VOLUME_FACTOR, detail?.weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type,
		)}`
		: '';

	const volume = ` ${detail.volume} cbm`;

	switch (label) {
		case 'container_size':
			if (detail?.container_size?.includes('HC')) {
				return detail?.container_size?.replace('HC', ' ft HC');
			}
			return `${detail?.container_size || '--'}ft`;
		case 'containers_count':
			if (!detail.containers_count) {
				return null;
			}

			if (detail.containers_count === CONTAINERS_COUNT) {
				return '1 Container';
			}

			return `${detail.containers_count} Containers`;
		case 'packages_count':
			if (!detail.packages_count) {
				return null;
			}

			if (detail.packages_count === PACKAGES_COUNT) {
				return '1 Package';
			}

			return `${detail.packages_count} Packages`;
		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === TRUCKS_COUNT) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;
		case 'truck_type':
			return startCase(detail.truck_type || '');
		case 'container_type':
			return startCase(detail.container_type || '');
		case 'trade_type':
			return startCase(detail.trade_type || '');
		case 'commodity':
			return startCase(detail.commodity || '');
		case 'payment_term':
			return startCase(detail.payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail.inco_term || '')}`;
		case 'packages':
			if (isEmpty(packages)) {
				return null;
			}
			return packageDetails(packages, inputValue);

		case 'volume':
			return ` ${volume} ${detail.service_type === 'ftl_freight_service'
				|| detail.service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${chargableWeight.toFixed(CHARGEABLE_WEIGHT_UPTO_DECIMAL)} kg`
			}`;
		case 'weight':
			return ` ${detail.weight} kgs`;
		case 'haulage_type':
			return startCase(detail.haulage_type || '');
		case 'transport_mode':
			return startCase(detail.transport_mode || '');
		case 'cargo_weight_per_container':
			return `${detail.cargo_weight_per_container} MT`;
		case 'destination_cargo_handling_type':
			return startCase(detail.destination_cargo_handling_type || '');
		case 'origin_cargo_handling_type':
			return startCase(detail.origin_cargo_handling_type || '');
		case 'cargo_handling_type':
			return startCase(detail.cargo_handling_type || '');
		case 'container_status':
			return startCase(detail.container_status || '');
		case 'source':
			return detail?.source === 'direct'
				? 'Sell Without Buy'
				: startCase(detail.source || '');
		case 'shipping_line.business_name':
			return detail.shipping_line?.business_name;
		case 'preferred_shipping_line.business_name':
			return detail.preferred_shipping_line?.business_name;
		case 'state':
			return startCase(detail.state || '');
		case 'origin_port.display_name':
			return detail?.origin_port?.display_name || '';
		case 'destination_port.display_name':
			return detail?.destination_port?.display_name || '';
		case 'origin_main_port.display_name':
			return detail?.origin_main_port?.display_name || '';
		case 'destination_main_port.display_name':
			return detail?.destination_main_port?.display_name || '';
		case 'origin_location.display_name':
			return detail.origin_location?.display_name || '';
		case 'container_handover_location':
			return detail.container_handover_location?.display_name || '';
		case 'container_pickup_location':
			return detail.container_pickup_location?.display_name || '';
		case 'destination_location.display_name':
			return detail.destination_location?.display_name || '';
		case 'schedule_departure':
			return formatDate({
				date       : detail?.schedule_departure || detail?.selected_schedule_departure,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
				separator  : ' | ',
			});
		case 'schedule_arrival':
			return formatDate({
				date       : detail?.schedule_arrival || detail?.selected_schedule_arrival,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
				separator  : ' | ',
			});
		case 'bn_expiry':
			return formatDate({
				date       : detail?.bn_expiry,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
				separator  : ' | ',
			});
		case 'booking_note_deadline':
			return formatDate({
				date       : detail?.booking_note_deadline,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'si_cutoff':
			return formatDate({
				date       : detail?.si_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'vgm_cutoff':
			return formatDate({
				date       : detail?.vgm_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'gate_in_cutoff':
			return formatDate({
				date       : detail?.gate_in_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'document_cutoff':
			return formatDate({
				date       : detail?.document_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'tr_cutoff':
			return formatDate({
				date       : detail?.tr_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : ' | ',
			});
		case 'iip_certificates':
			return formatCertificate(detail?.iip_certificates || []);
		case 'msds_certificates':
			return formatCertificate(detail?.msds_certificates || []);
		case 'bl_category':
			return upperCase(detail.bl_category);
		case 'bl_type':
			return upperCase(detail.bl_type);
		case 'cargo_readiness_date':
			return formatDate({
				date       : detail?.cargo_readiness_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
				separator  : ' | ',
			});
		case 'supplier_poc':
			return formatPocData(detail?.supplier_poc || {});
		case 'origin_oversea_agent':
			return formatPocData(detail?.origin_oversea_agent || {});
		case 'shipper_details':
			return formatShipperDetails(detail?.shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${detail?.buy_quotation_agreed_rates.toFixed(BUY_QUOTATION_RATE_UPTO_DECIMAL)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;
		case 'delivery_date':
			return formatDate({
				date       : detail?.delivery_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
				separator  : ' | ',
			});
		default:
			return detail[label] || null;
	}
};
