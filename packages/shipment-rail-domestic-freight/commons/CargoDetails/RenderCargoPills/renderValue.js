import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOpenlink } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SINGULAR_CONSTANT = 1;
const ROUNDING_OFF_CONSTANT = 2;
const VOLUME_CONVERSION_CONSTANT = 166.67;
const INCREMENT_CONSTANT = 1;
const DEFAULT_VOLUME = 0;

export const renderValue = (label, detail = {}) => {
	const chargableWeight = Math.max((detail?.volume || DEFAULT_VOLUME) * VOLUME_CONVERSION_CONSTANT, detail?.weight);

	const volume = ` ${detail.volume} cbm`;

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

	const formatShipperDetails = (shipperDetails) => (
		<div>
			<div>{shipperDetails?.name}</div>
			<div>{shipperDetails?.address}</div>
		</div>
	);

	const formatCertificate = (certificates) => (
		<div className={styles.certificate_container}>
			{(certificates || []).map((item, key) => (
				<a href={item} target="_blank" rel="noreferrer" key={item}>
					{`Click to view certificate ${key + INCREMENT_CONSTANT} `}
					<IcMOpenlink />
					<br />
				</a>
			))}
		</div>
	);

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
			if (detail.containers_count === SINGULAR_CONSTANT) {
				return '1 Container';
			}

			return `${detail.containers_count} Container`;
		case 'packages_count':
			if (!detail.packages_count) {
				return null;
			}

			if (detail.packages_count === SINGULAR_CONSTANT) {
				return '1 Package';
			}

			return `${detail.packages_count} Packages`;
		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === SINGULAR_CONSTANT) {
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
		case 'volume':
			return ` ${volume} ${detail.service_type === 'ftl_freight_service'
				|| detail.service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${chargableWeight.toFixed(ROUNDING_OFF_CONSTANT)} kg`
			}`;
		case 'weight':
			return ` ${detail.weight} kgs`;
		case 'haulage_type':
			return startCase(detail.haulage_type || '');
		case 'transport_mode':
			return startCase(detail.transport_mode || '');
		case 'cargo_weight_per_container':
			return detail?.cargo_weight_per_container ? `${detail.cargo_weight_per_container} MT` : null;
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
		case 'state':
			return startCase(detail.state || '');
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
			});
		case 'schedule_arrival':
			return formatDate({
				date       : detail?.schedule_arrival || detail?.selected_schedule_arrival,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'bn_expiry':
			return formatDate({
				date       : detail?.bn_expiry,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'booking_note_deadline':
			return formatDate({
				date       : detail?.booking_note_deadline,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
			});
		case 'si_cutoff':
			return formatDate({
				date       : detail?.si_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
			});
		case 'vgm_cutoff':
			return formatDate({
				date       : detail?.vgm_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
			});
		case 'gate_in_cutoff':
			return formatDate({
				date       : detail?.gate_in_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
			});
		case 'document_cutoff':
			return formatDate({
				date       : detail?.document_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
			});
		case 'tr_cutoff':
			return formatDate({
				date       : detail?.tr_cutoff,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'dateTime',
				separator  : '-',
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
			});
		case 'supplier_poc':
			return formatPocData(detail?.supplier_poc || {});
		case 'origin_oversea_agent':
			return formatPocData(detail?.origin_oversea_agent || {});
		case 'shipper_details':
			return formatShipperDetails(detail?.shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${detail?.buy_quotation_agreed_rates.toFixed(ROUNDING_OFF_CONSTANT)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;
		case 'delivery_date':
			return formatDate({
				date       : detail?.delivery_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'container_load_type':
			return startCase(detail[label] || '');
		default:
			return detail[label] || null;
	}
};
