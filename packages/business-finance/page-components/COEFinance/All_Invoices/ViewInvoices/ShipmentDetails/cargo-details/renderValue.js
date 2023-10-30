import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDateValue from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import { formatDate } from '../../../../../commons/utils/formatDate';

import CommodityDetails from './CommodityDetails';
import FormatCertificate from './FormatCertificate';
import FormatPocData from './FormatPocData';
import FormatShipperDetails from './FormatShipperDetails';
import PackageDetails from './PackageDetails';
import PrintTruckTypes from './PrintTruckTypes';

// eslint-disable-next-line max-lines-per-function
export const renderValue = (label, detail) => {
	const { packages = [] } = detail || [{}];
	const isAir = detail?.shipment_type === 'air_freight'
		|| detail?.shipment_type === 'domestic_air_freight'
		|| detail?.services?.includes('air_freight_service');
	const isLTL = detail?.shipment_type === 'ltl_freight'
		|| detail?.services?.includes('ltl_freight_service');

	const commodityDataDetails = detail?.commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const valueForInput = Array.isArray(packages) && !isEmpty(packages)
		? packages[GLOBAL_CONSTANTS.zeroth_index] : null;

	const chargableWeight = isLTL
		? detail?.chargable_weight || detail?.weight
		: Math.max(detail.volume * 166.67, detail?.weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type,
		)}`
		: '';

	const lRNumber = detail?.lr_number;
	const ewayBillNumber = detail?.eway_bill_number;

	const volume = ` ${detail.volume} ${isLTL ? 'cc' : 'cbm'}`;

	switch (label) {
		case 'container_size':
			if (detail.container_size.includes('HC')) {
				return detail.container_size.replace('HC', 'ft HC');
			}
			return `${detail.container_size || '--'}ft`;
		case 'containers_count':
			if (!detail.containers_count) {
				return null;
			}

			if (detail.containers_count === 1) {
				return '1 Container';
			}

			return `${detail.containers_count} Containers`;
		case 'packages_count':
			if (!detail.packages_count) {
				return null;
			}

			if (detail.packages_count === 1) {
				return '1 Package';
			}

			return `${detail.packages_count} Packages`;
		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === 1) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;
		case 'truck_type':
			return startCase(detail.truck_type || '');
		case 'truck_types':
			return <PrintTruckTypes detail={detail} />;
		case 'container_type':
			return startCase(detail.container_type || '');
		case 'trade_type':
			return startCase(detail.trade_type || '');
		case 'commodity':
			return <CommodityDetails isAir={isAir} detail={detail} commodityDataDetails={commodityDataDetails} />;
		case 'payment_term':
			return startCase(detail.payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail.inco_term || '')}`;
		case 'awb_execution_date':
			return `AWB Execution Date - ${formatDateValue({
				date       : detail?.awb_execution_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})}`;
		case 'packages':
			if (isEmpty(packages)) {
				return null;
			}
			return <PackageDetails packages={packages} inputValue={inputValue} />;

		case 'volume':
			return ` ${volume} ${
				detail.service_type === 'ftl_freight_service'
				|| detail.service_type === 'haulage_freight_service'
					? ''
					: `, Chargeable Weight: ${chargableWeight.toFixed(2)} kg`
			}`;

		case 'lr_number':
			if (isLTL) {
				return `Docket Number : ${lRNumber || ''}`;
			}
			return '';

		case 'master_airway_bill_number':
			if (isAir) {
				return `MAWB Number: ${detail?.master_airway_bill_number || ''}`;
			}
			return '';
		case 'house_airway_bill_number':
			if (isAir) {
				return `HAWB Number: ${detail?.house_airway_bill_number || ''}`;
			}
			return '';
		case 'is_minimum_price_shipment':
			if (isAir) {
				return 'Min. Price';
			}
			return '';
		case 'price_type':
			return `Price Type: ${startCase(detail?.price_type || '')}`;
		case 'eway_bill_number':
			if (isLTL) {
				return `Eway Bill Number : ${ewayBillNumber || ''}`;
			}
			return '';
		case 'airline':
			if (isAir) {
				return `Airline : ${detail?.airline?.business_name || ''}`;
			}
			return '';
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
			return detail?.origin_location?.display_name || '';
		case 'container_handover_location':
			return detail?.container_handover_location?.display_name || '';
		case 'container_pickup_location':
			return detail?.container_pickup_location?.display_name || '';
		case 'destination_location.display_name':
			return detail?.destination_location?.display_name || '';
		case 'schedule_departure':
			return formatDate(
				detail?.schedule_departure || detail?.selected_schedule_departure,
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'schedule_arrival':
			return formatDate(
				detail?.schedule_arrival || detail?.selected_schedule_arrival,
				'dd MMM yyyy',
				{},
				true,
			);
		case 'bn_expiry':
			return formatDate(
				detail?.bn_expiry || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'booking_note_deadline':
			return formatDate(
				detail?.booking_note_deadline || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'si_cutoff':
			return formatDate(
				detail?.si_cutoff || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'vgm_cutoff':
			return formatDate(
				detail?.vgm_cutoff || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'gate_in_cutoff':
			return formatDate(
				detail?.gate_in_cutoff || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'document_cutoff':
			return formatDate(
				detail?.document_cutoff || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'tr_cutoff':
			return formatDate(
				detail?.tr_cutoff || '',
				'dd MMM yyyy - hh:mm a',
				{},
				true,
			);
		case 'iip_certificates':
			return <FormatCertificate certificates={detail?.iip_certificates} />;
		case 'msds_certificates':
			return <FormatCertificate certificates={detail?.msds_certificates} />;
		case 'bl_category':
			return upperCase(detail.bl_category);
		case 'bl_type':
			return upperCase(detail.bl_type);
		case 'cargo_readiness_date':
			return formatDate(
				detail?.cargo_readiness_date || '',
				'dd MMM yyyy',
				{},
				true,
			);
		case 'supplier_poc':
			return <FormatPocData pocDetails={detail?.supplier_poc} />;
		case 'origin_oversea_agent':
			return <FormatPocData pocDetails={detail?.origin_oversea_agent} />;
		case 'shipper_details':
			return <FormatShipperDetails shipperDetails={detail?.shipper_details} />;
		case 'buy_quotation_agreed_rates':
			return `${detail?.buy_quotation_agreed_rates.toFixed(2)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;

		case 'delivery_date':
			return formatDateValue({
				date       : detail?.delivery_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});

		case 'container_load_type':
			return startCase(detail?.container_load_type);

		default:
			return detail[label] || null;
	}
};
