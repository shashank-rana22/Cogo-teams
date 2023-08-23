import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOpenlink } from '@cogoport/icons-react';
import { startCase, upperCase, isEmpty } from '@cogoport/utils';

const CHECK_IF_COUNT_MORE_THAN_ONE = 1;
const MIN_VOLUME = 1;
const VOLUME_MULTIPLY = 166.67;
const TO_FIXED_2 = 2;
const INCREASE_INDEX_BY = 1;
const LAST_INDEX = 1;
const NO_VOLUME_SERVICE_TYPES = ['ftl_freight_service', 'haulage_freight_service'];
const AIR_TYPE_SERVICES = ['air_freight_service', 'domestic_air_freight_service'];
const AIR_SERVICES = ['air_freight', 'domestic_air_freight_service', 'air_freight_service', 'domestic_air_freight'];
const FTL_SERVICES = ['ftl_freight', 'haulage_freight', 'ftl_freight_service', 'haulage_freight_service'];
const LTL_SERVICES = ['ltl_freight', 'ltl_freight_service'];

function FormatCertificate({ certificates = [] }) {
	return (
		<div>
			{(certificates || []).map((item, index) => (
				<a href={item} target="_blank" rel="noreferrer" key={item}>
					Click to view certificate
					{index + INCREASE_INDEX_BY}
					<IcMOpenlink />
					<br />
				</a>
			))}
		</div>
	);
}

function FormatPocData({ pocDetails = {} }) {
	return (
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
}

function FormatShipperDetails({ shipperDetails = {} }) {
	return (
		<div>
			<div>{shipperDetails?.name}</div>
			<div>{shipperDetails?.address}</div>
		</div>
	);
}

export const RENDER_VALUE_MAPPING = {
	container_size: (detail) => {
		if (detail.container_size?.includes('HC')) {
			return detail.container_size.replace('HC', 'ft HC');
		}
		return `${detail.container_size || '--'}ft`;
	},
	containers_count: (detail) => {
		const { containers_count } = detail || {};
		if (!containers_count) {
			return null;
		}
		return containers_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${containers_count} Containers` : '1 Container';
	},
	packages_count: (detail) => {
		const { packages_count } = detail || {};
		if (!packages_count) {
			return null;
		}
		return packages_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${packages_count} Packages` : '1 Package';
	},
	trucks_count: (detail) => {
		const { trucks_count } = detail || {};
		if (!trucks_count) {
			return null;
		}
		return trucks_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${trucks_count} Trucks` : '1 Truck';
	},
	truck_type     : (detail) => startCase(detail.truck_type || ''),
	container_type : (detail) => startCase(detail.container_type || ''),
	trade_type     : (detail) => startCase(detail.trade_type || ''),
	commodity      : (detail) => startCase(detail.commodity || ''),
	payment_term   : (detail) => startCase(detail.payment_term || ''),
	inco_term      : (detail) => `Inco - ${upperCase(detail.inco_term || '')}`,
	packages       : (detail) => {
		const { packages = [] } = detail || {};
		if (isEmpty(packages)) {
			return null;
		}

		const valueForInput = Array.isArray(packages) ? packages[GLOBAL_CONSTANTS.zeroth_index] : null;

		const { length = 0, width = 0, height = 0, packages_count, packing_type } = valueForInput || {};
		const dimension = length
			? `${length}cm X ${width}cm X ${height}cm,`
			: '';

		const inputValue = valueForInput ? `${packages_count} Pkg, ${dimension} ${startCase(packing_type)}` : '';
		if (packages?.length > CHECK_IF_COUNT_MORE_THAN_ONE) {
			return (
				<Tooltip
					placement="bottom"
					content={(
						<div>
							{(packages || []).map((item) => (item
								? `${item.packages_count} Pkg,
									 (${item.length}cm X ${item.width}cm X ${item.height}cm), 
									 ${startCase(item.itempacking_type || '')}`
								: ''))}
						</div>
					)}
				>
					<div>{`Package: ${inputValue} + ${packages.length - LAST_INDEX} more`}</div>
				</Tooltip>
			);
		}
		return `Package: ${inputValue}`;
	},
	volume: (detail) => {
		const { chargable_weight, weight, volume, isLTL, service_type } = detail || {};

		const calcVolume = volume && `${volume?.toFixed(TO_FIXED_2)} ${isLTL ? 'cc' : 'cbm'}`;

		const chargableWeight = isLTL
			? (chargable_weight || weight)
			: Math.max((volume || MIN_VOLUME) * VOLUME_MULTIPLY, weight);

		const chargableText = (chargableWeight && !NO_VOLUME_SERVICE_TYPES.includes(service_type))
			? `, Chargable Weight: ${chargableWeight?.toFixed(TO_FIXED_2) || ''} kg` : '';

		return `${calcVolume || ''} ${chargableText}`;
	},
	lr_number: (detail) => {
		const { lr_number, isLTL } = detail || {};

		return isLTL ? `Docket Number : ${lr_number || ''}` : '';
	},
	master_airway_bill_number: (detail) => {
		const { master_airway_bill_number, isAir } = detail || {};

		return isAir ? `MAWB Number: ${master_airway_bill_number || ''}` : '';
	},
	house_airway_bill_number: (detail) => {
		const { house_airway_bill_number, isAir } = detail || {};

		return isAir ? `HAWB Number: ${house_airway_bill_number || ''}` : '';
	},
	eway_bill_number: (detail) => {
		const { eway_bill_number, isLTL } = detail || {};
		return isLTL ? `Eway Bill Number : ${eway_bill_number || ''}` : '';
	},
	airline: (detail) => (detail?.isAir
		? `Airline : ${detail?.airline?.business_name || ''}` : ''),
	weight                          : (detail) => (detail.weight ? `${detail.weight} kgs` : ''),
	haulage_type                    : (detail) => startCase(detail.haulage_type || ''),
	transport_mode                  : (detail) => startCase(detail.transport_mode || ''),
	cargo_weight_per_container      : (detail) => `${detail.cargo_weight_per_container} MT`,
	destination_cargo_handling_type : (detail) => startCase(detail.destination_cargo_handling_type || ''),
	origin_cargo_handling_type      : (detail) => startCase(detail.origin_cargo_handling_type || ''),
	container_status                : (detail) => startCase(detail.container_status || ''),
	source                          : (detail) => (detail?.source === 'direct'
		? 'Sell Without Buy' : startCase(detail.source || '')),
	container_handover_location : (detail) => detail?.container_handover_location?.display_name || '',
	container_pickup_location   : (detail) => detail?.container_pickup_location?.display_name || '',
	schedule_departure          : (detail) => formatDate({
		date       : detail?.schedule_departure || detail?.selected_schedule_departure,
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	schedule_arrival: (detail) => formatDate({
		date       : detail?.schedule_arrival || detail?.selected_schedule_arrival,
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	}),
	bn_expiry: (detail) => formatDate({
		date       : detail?.bn_expiry || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	booking_note_deadline: (detail) => formatDate({
		date       : detail?.booking_note_deadline || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	si_cutoff: (detail) => formatDate({
		date       : detail?.si_cutoff || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	vgm_cutoff: (detail) => formatDate({
		date       : detail?.vgm_cutoff || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	gate_in_cutoff: (detail) => formatDate({
		date       : detail?.gate_in_cutoff || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	document_cutoff: (detail) => formatDate({
		date       : detail?.document_cutoff || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	tr_cutoff: (detail) => formatDate({
		date       : detail?.tr_cutoff || '',
		formatType : 'dateTime',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
		separator  : ' - ',
	}),
	iip_certificates     : (detail) => <FormatCertificate certificates={detail?.iip_certificates} />,
	msds_certificates    : (detail) => <FormatCertificate certificates={detail?.msds_certificates} />,
	bl_category          : (detail) => upperCase(detail.bl_category || ''),
	bl_type              : (detail) => upperCase(detail.bl_type || ''),
	cargo_readiness_date : (detail) => formatDate({
		date       : detail?.cargo_readiness_date || '',
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	}),
	supplier_poc               : (detail) => <FormatPocData pocDetails={detail?.supplier_poc} />,
	origin_oversea_agent       : (detail) => <FormatPocData pocDetails={detail?.origin_oversea_agent} />,
	shipper_details            : (detail) => <FormatShipperDetails shipperDetails={detail?.shipper_details} />,
	buy_quotation_agreed_rates : (detail) => `${detail?.buy_quotation_agreed_rates.toFixed(TO_FIXED_2)} USD`,
	hs_code                    : (detail) => `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`,
};

export function formatServiceDetails(details) {
	const { service_type, services } = details || {};

	const isLTL = service_type === 'ltl_freight_service'
		|| services?.includes('ltl_freight_service');

	const isAir = AIR_TYPE_SERVICES.includes(service_type);

	return { ...details, isAir, isLTL };
}

export function serviceDetails({ detail = {}, service }) {
	const isAir = (AIR_SERVICES || []).includes(detail[service]);
	const isFTL = (FTL_SERVICES || []).includes(detail[service]);
	const isLTL = (LTL_SERVICES || []).includes(detail[service]);

	return { ...detail, isAir, isLTL, isFTL };
}
