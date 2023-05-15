import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOpenlink } from '@cogoport/icons-react';
import { startCase, upperCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

const getFormattedDate = (date, dateformat = 'date') => {
	if (dateformat === 'dateTime') {
		return formatDate({
			date,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'dateTime',
			separator  : '-',
		});
	}

	return formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});
};

export const renderValue = (label, detail) => {
	const { packages = [] } = detail || {};

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const chargableWeight = Math.max(Number(detail?.volume || 0) * 166.67, detail?.weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width || 0}cm X ${valueForInput?.height || 0}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count || 0} Pkg, ${dimension} ${startCase(
			valueForInput?.packing_type || '',
		)}`
		: '';

	const volume = ` ${detail?.volume} cbm`;

	const packageDetails = () => {
		if (packages?.length > 1) {
			return (
				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div className={styles.font}>
							{(packages || []).map((item) => {
								const values = item
									? `${item.packages_count || 0} Pkg, (${item?.length || 0}cm X ${item?.width || 0
									}cm X ${item?.height || 0}cm), ${startCase(item?.packing_type || '')}`
									: '';
								return <div key={values}>{values}</div>;
							})}
						</div>
					)}
				>
					<div className="cargo-details-info">
						{`Package: ${inputValue} + ${packages.length - 1
						} more`}

					</div>
				</Tooltip>
			);
		}
		return `Package: ${inputValue}`;
	};

	const formatPocData = (pocDetails) => (
		<div>
			<div>{pocDetails?.name || ''}</div>
			<div>
				{pocDetails?.mobile_country_code || ''}
				-
				{pocDetails?.mobile_number || ''}
			</div>
			<div>{pocDetails?.email || ''}</div>
		</div>
	);

	const formatShipperDetails = (shipperDetails) => (
		<div>
			<div>{shipperDetails?.name || ''}</div>
			<div>{shipperDetails?.address || ''}</div>
		</div>
	);

	const formatCertificate = (certificates) => (
		<div className={styles.certificate_container}>
			{(certificates || []).map((item, key) => (
				<a href={item} target="_blank" rel="noreferrer" key={item}>
					Click to view certificate
					&nbsp;
					{key + 1}
					&nbsp;
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
			if (!detail?.containers_count) {
				return null;
			}

			if (detail?.containers_count === 1) {
				return '1 Container';
			}

			return `${detail?.containers_count} Containers`;
		case 'packages_count':
			if (!detail?.packages_count) {
				return null;
			}

			if (detail?.packages_count === 1) {
				return '1 Package';
			}

			return `${detail?.packages_count} Packages`;
		case 'trucks_count':
			if (!detail?.trucks_count) {
				return null;
			}

			if (detail?.trucks_count === 1) {
				return '1 Truck';
			}

			return `${detail?.trucks_count} Trucks`;
		case 'truck_type':
			return startCase(detail?.truck_type || '');
		case 'container_type':
			return startCase(detail?.container_type || '');
		case 'trade_type':
			return startCase(detail?.trade_type || '');
		case 'commodity':
			return startCase(detail?.commodity || '');
		case 'payment_term':
			return startCase(detail?.payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail?.inco_term || '')}`;
		case 'packages':
			if (packages?.length === 0) {
				return null;
			}
			return packageDetails();

		case 'volume':
			return ` ${volume} ${detail?.service_type === 'ftl_freight_service'
				|| detail?.service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${(chargableWeight || 0).toFixed(2)} kg`
			}`;
		case 'weight':
			return ` ${detail?.weight} kgs`;
		case 'haulage_type':
			return startCase(detail?.haulage_type || '');
		case 'transport_mode':
			return startCase(detail?.transport_mode || '');
		case 'cargo_weight_per_container':
			return `${detail?.cargo_weight_per_container} MT`;
		case 'destination_cargo_handling_type':
			return startCase(detail?.destination_cargo_handling_type || '');
		case 'origin_cargo_handling_type':
			return startCase(detail?.origin_cargo_handling_type || '');
		case 'container_status':
			return startCase(detail?.container_status || '');
		case 'source':
			return detail?.source === 'direct'
				? 'Sell Without Buy'
				: startCase(detail?.source || '');
		case 'shipping_line.business_name':
			return detail?.shipping_line?.business_name;
		case 'preferred_shipping_line.business_name':
			return detail?.preferred_shipping_line?.business_name;
		case 'state':
			return startCase(detail?.state || '');
		case 'origin_port.display_name':
			return detail?.origin_port?.display_name || '';
		case 'destination_port.display_name':
			return detail?.destination_port?.display_name || '';
		case 'origin_main_port.display_name':
			return detail?.origin_main_port?.display_name || '';
		case 'destination_main_port.display_name':
			return detail?.destination_main_port?.display_name || '';
		case 'origin_location.display_name':
			return detail?.origin_location.display_name || '';
		case 'container_handover_location':
			return detail?.container_handover_location.display_name || '';
		case 'container_pickup_location':
			return detail?.container_pickup_location.display_name || '';
		case 'destination_location.display_name':
			return detail?.destination_location.display_name || '';
		case 'schedule_departure':
			return getFormattedDate(detail?.schedule_departure || detail?.selected_schedule_departure, 'date');

		case 'schedule_arrival':
			return getFormattedDate(detail?.schedule_arrival || detail?.selected_schedule_arrival, 'date');

		case 'bn_expiry':
			return format(detail?.bn_expiry, 'dd MMM yyyy');
		case 'booking_note_deadline':
			return getFormattedDate(detail?.booking_note_deadline, 'dateTime');

		case 'si_cutoff':
			return getFormattedDate(detail?.si_cutoff, 'dateTime');

		case 'vgm_cutoff':
			return getFormattedDate(detail?.vgm_cutoff, 'dateTime');

		case 'gate_in_cutoff':
			return getFormattedDate(detail?.gate_in_cutoff, 'dateTime');

		case 'document_cutoff':
			return getFormattedDate(detail?.document_cutoff, 'dateTime');

		case 'tr_cutoff':
			return getFormattedDate(detail?.tr_cutoff, 'dateTime');

		case 'iip_certificates':
			return formatCertificate(detail?.iip_certificates || []);
		case 'msds_certificates':
			return formatCertificate(detail?.msds_certificates || []);
		case 'bl_category':
			return upperCase(detail?.bl_category);
		case 'bl_type':
			return upperCase(detail?.bl_type);
		case 'cargo_readiness_date':
			return getFormattedDate(detail?.cargo_readiness_date, 'date');

		case 'supplier_poc':
			return formatPocData(detail?.supplier_poc || {});
		case 'origin_oversea_agent':
			return formatPocData(detail?.origin_oversea_agent || {});
		case 'shipper_details':
			return formatShipperDetails(detail?.shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${(detail?.buy_quotation_agreed_rates || 0).toFixed(2)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;
		case 'delivery_date':
			return getFormattedDate(detail?.delivery_date, 'date');

		default:
			return detail?.[label] || null;
	}
};
