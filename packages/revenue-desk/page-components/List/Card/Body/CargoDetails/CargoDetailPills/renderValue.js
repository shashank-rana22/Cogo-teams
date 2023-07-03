/* eslint-disable no-magic-numbers */
import { Tooltip, Toast } from '@cogoport/components';
import { format, startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const KEY_MAP = {
	revert_count                            : 'revertCount',
	container_size                          : 'containerSize',
	containers_count                        : 'containerCount',
	packages_count                          : 'packagesCount',
	trucks_count                            : 'truckCount',
	truck_type                              : 'truckType',
	truck_types                             : 'truckTypes',
	container_type                          : 'containerType',
	trade_type                              : 'tradeType',
	commodity                               : 'commodity',
	payment_term                            : 'paymentTerm',
	inco_term                               : 'incoTerm',
	awb_execution_date                      : 'awbExecutionDate',
	packages                                : 'packages',
	volume                                  : 'volume',
	lr_number                               : 'lrNumber',
	master_airway_bill_number               : 'masterAirwayBillNumber',
	house_airway_bill_number                : 'houseAirwayBillNumber',
	price_type                              : 'priceType',
	eway_bill_number                        : 'ewayBillNumber',
	airline                                 : 'airline',
	weight                                  : 'weight',
	haulage_type                            : 'haulageType',
	transport_mode                          : 'transportMode',
	cargo_weight_per_container              : 'cargoWeightPerContainer',
	destination_cargo_handling_type         : 'destinationCargoHandlingType',
	origin_cargo_handling_type              : 'originCargoHandlingType',
	container_status                        : 'containerStatus',
	source                                  : 'source',
	'shipping_line.business_name'           : 'shippingLineBusinessName',
	'preferred_shipping_line.business_name' : 'preferredShippingLineBusinessName',
	state                                   : 'state',
	'origin_port.display_name'              : 'originPortDisplayName',
	'destination_port.display_name'         : 'destinationPortDisplayName',
	'origin_main_port.display_name'         : 'originMainPortDisplayName',
	'origin_location.display_name'          : 'originLocationDisplayName',
	container_handover_location             : 'containerHandoverLocation',
	container_pickup_location               : 'containerPickupLocation',
	'destination_location.display_name'     : 'destinationLocationDisplayName',
	schedule_departure                      : 'scheduleDeparture',
	schedule_arrival                        : 'scheduleArrival',
	bn_expiry                               : 'bnExpiry',
	booking_note_deadline                   : 'bookingNoteDeadline',
	si_cutoff                               : 'siCutoff',
	vgm_cutoff                              : 'vgmCutoff',
	gate_in_cutoff                          : 'gateInCutoff',
	document_cutoff                         : 'documentCutoff',
	tr_cutoff                               : 'trCutoff',
	bl_category                             : 'blCategory',
	bl_type                                 : 'blType',
	cargo_readiness_date                    : 'cargoReadinessDate',
	supplier_poc                            : 'supplierPoc',
	origin_oversea_agent                    : 'originOverseaAgent',
	shipper_details                         : 'shipperDetails',
	buy_quotation_agreed_rates              : 'buyQuotationAgreedRates',
	hs_code                                 : 'hsCode',
	delivery_date                           : 'deliveryDate',
	container_load_type                     : 'containerLoadType',
};

const copyToClipboard = async (text) => {
	const modifiedText = text.replace(/-/g, '');
	try {
		await navigator.clipboard.writeText(modifiedText);
		Toast.success('MAWB Number copied to clipboard');
	} catch (err) {
		Toast.error('Failed to copy MAWB Number');
	}
};

const details = {
	revertCount({ detail }) {
		return `${detail?.revert_count} Revert`;
	},
	containerSize({ detail }) {
		if (detail.container_size.includes('HC')) {
			return detail.container_size.replace('HC', 'ft HC');
		}
		return `${detail.container_size || '--'}ft`;
	},
	containerCount({ detail }) {
		if (!detail.containers_count) {
			return null;
		}
		if (detail.containers_count === 1) {
			return '1 Container';
		}
		return `${detail.containers_count} Containers`;
	},
	packagesCount({ detail }) {
		if (!detail.packages_count) {
			return null;
		}
		if (detail.packages_count === 1) {
			return '1 Package';
		}
		return `${detail.packages_count} Packages`;
	},
	truckCount({ detail }) {
		if (!detail.trucks_count) {
			return null;
		}
		if (detail.trucks_count === 1) {
			return '1 Truck';
		}
		return `${detail.trucks_count} Trucks`;
	},
	truckType({ detail }) {
		return startCase(detail.truck_type || '');
	},
	truckTypes({ detail }) {
		if (detail?.truck_types?.length > 1) {
			return (
				<div style={{ display: 'flex' }}>
					{startCase(detail?.truck_types?.[0])}
					{' '}
					<Tooltip
						placement="bottom"
						theme="light"
						content={(
							<div style={{ fontSize: '10px' }}>
								{detail?.truck_types?.slice(1)?.map((item) => (
									<div key={item}>{startCase(item)}</div>
								))}
							</div>
						)}
					>
						<div className={styles.CountOfTruckTypes}>
							{`+ ${
								(detail?.truck_types?.length || 1) - 1
							} more`}

						</div>
					</Tooltip>
				</div>
			);
		}
		return startCase(detail?.truck_types?.[0]);
	},
	containerType({ detail }) {
		return startCase(detail.container_type || '');
	},
	tradeType({ detail }) {
		return startCase(detail.trade_type || '');
	},
	commodity({ detail }) {
		const commodityDataDetails = detail.commodity_details?.[0] || {};
		if (detail.commodity === 'special_consideration') {
			return (
				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div className={styles.CommodityContainer}>
							{(commodityDataDetails?.commodity_type
								|| detail?.commodity_type) && (
									<div>
										Commodity Type:
										{startCase(
											commodityDataDetails.commodity_type
											|| detail.commodity_type,
										)}
									</div>
							)}
							{(commodityDataDetails?.commodity_subtype
								|| detail?.commodity_sub_type) && (
									<div>
										Commodity Sub Type:
										{startCase(
											commodityDataDetails.commodity_subtype
											|| detail.commodity_sub_type,
										)}
									</div>
							)}
						</div>
					)}
				>
					<div>{startCase(detail.commodity)}</div>
				</Tooltip>
			);
		}
		return startCase(detail.commodity);
	},
	paymentterm({ detail }) {
		return startCase(detail.payment_term || '');
	},
	incoTerm({ detail }) {
		return `Inco - ${upperCase(detail.inco_term || '')}`;
	},
	awbExecutionDate({ detail }) {
		return `AWB Execution Date - ${format(detail.awb_execution_date, 'dd MMM yyyy')}`;
	},
	packages({ detail }) {
		const { packages = [] } = detail || {};
		const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;
		const dimension = valueForInput?.length
			? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
			: '';
		const inputValue = valueForInput
			? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(
				valueForInput?.packing_type,
			)}`
			: '';
		if (packages?.length === 0) {
			return null;
		}
		if (packages?.length > 1) {
			return (
				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div style={{ fontSize: '10px' }}>
							{(packages || []).map((item) => {
								const values = item
									? `${item.packages_count} Pkg, (${item?.length}cm X ${
										item?.width
									}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
									: '';
								return <div key={item}>{values}</div>;
							})}
						</div>
					)}
				>
					<div className="cargo-details-info">
						{`Package: ${inputValue} + ${
							(packages?.length || 1) - 1
						} more`}

					</div>
				</Tooltip>
			);
		}
		return `Package: ${inputValue}`;
	},
	volume({ detail }) {
		const isLTL = detail?.service_type === 'ltl_freight_service';
		const volume = ` ${Number(detail.volume).toFixed(2)} ${isLTL ? 'cc' : 'cbm'}`;
		const chargableWeight = isLTL
			? detail?.chargable_weight || detail?.weight
			: Number(detail?.chargeable_weight)
		|| Math.max((detail?.volume || 0) * 166.67, detail?.weight || 0);
		return ` ${volume} ${
			detail.service_type === 'ftl_freight_service'
			|| detail.service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${chargableWeight.toFixed(2)} kg`
		}`;
	},
	lrNumber({ detail }) {
		const isLTL = detail?.service_type === 'ltl_freight_service';
		const lr_number = detail?.lr_number;
		if (isLTL) {
			return `Docket Number : ${lr_number || ''}`;
		}
		return '';
	},
	masterAirwayBillNumber({ detail }) {
		const isAir = ['air_freight_service', 'domestic_air_freight_service'].includes(detail?.service_type);
		if (isAir) {
			return (
				<div>
					<span>
						MAWB Number:
						{' '}
						{detail?.master_airway_bill_number || ''}
					</span>
				</div>
			);
		}
		return '';
	},
	houseAirwayBillNumber({ detail }) {
		const isAir = ['air_freight_service', 'domestic_air_freight_service'].includes(detail?.service_type);
		if (isAir) {
			return `HAWB Number: ${detail?.house_airway_bill_number || ''}`;
		}
		return '';
	},
	priceType({ detail }) {
		return `Price Type: ${startCase(detail?.price_type || '')}`;
	},
	ewayBillNumber({ detail }) {
		const isLTL = detail?.service_type === 'ltl_freight_service';
		const eway_bill_number = detail?.eway_bill_number;
		if (isLTL) {
			return `Eway Bill Number : ${eway_bill_number || ''}`;
		}
		return '';
	},
	airline({ detail }) {
		const isAir = ['air_freight_service', 'domestic_air_freight_service'].includes(detail?.service_type);
		if (isAir) {
			return `Airline : ${detail?.airline?.business_name || ''}`;
		}
		return '';
	},
	weight({ detail }) {
		const isFTL = detail?.service_type === 'ftl_freight_service';
		return ` ${Number(detail.weight).toFixed(2)} ${isFTL ? 'Ton' : 'Kgs'}`;
	},
	haulageType({ detail }) {
		return startCase(detail.haulage_type || '');
	},
	transportMode({ detail }) {
		return startCase(detail.transport_mode || '');
	},
	cargoWeightPerContainer({ detail }) {
		return `${detail.cargo_weight_per_container} MT`;
	},
	destinationCargoHandlingType({ detail }) {
		return startCase(detail.destination_cargo_handling_type || '');
	},
	originCargoHandlingType({ detail }) {
		return startCase(detail.origin_cargo_handling_type || '');
	},
	containerStatus({ detail }) {
		return startCase(detail.container_status || '');
	},
	source({ detail }) {
		return detail?.source === 'direct'
			? 'Sell Without Buy'
			: startCase(detail.source || '');
	},
	shippingLineBusinessName({ detail }) {
		return detail.shipping_line?.business_name;
	},

	preferredShippingLineBusinessName({ detail }) {
		return detail.preferred_shipping_line?.business_name;
	},
	state({ detail }) {
		return startCase(detail.state || '');
	},
	originPortDisplayName({ detail }) {
		return detail?.origin_port?.display_name || '';
	},
	destinationPortDisplayName({ detail }) {
		return detail?.destination_port?.display_name || '';
	},
	originMainPortDisplayName({ detail }) {
		return detail?.origin_main_port?.display_name || '';
	},
	destinationMainPortDisplayName({ detail }) {
		return detail?.destination_main_port?.display_name || '';
	},
	originLocationDisplayName({ detail }) {
		return detail.origin_location.display_name || '';
	},
	containerHandoverLocation({ detail }) {
		return detail.container_handover_location.display_name || '';
	},
	containerPickupLocation({ detail }) {
		return detail.container_pickup_location.display_name || '';
	},
	destinationLocationDisplayName({ detail }) {
		return detail.destination_location.display_name || '';
	},
	scheduleDeparture({ detail }) {
		return format(detail?.schedule_departure || detail?.selected_schedule_departure, 'dd MMM yyyy - hh:mm aaa');
	},
	scheduleArrival({ detail }) {
		return format(detail?.schedule_arrival || detail?.selected_schedule_arrival, 'dd MMM yyyy');
	},
	bnExpiry({ detail }) {
		return format(detail?.bn_expiry, 'dd MMM yyyy - hh:mm aaa');
	},
	bookingNoteDeadline({ detail }) {
		return format(detail?.booking_note_deadline, 'dd MMM yyyy - hh:mm aaa');
	},
	siCutoff({ detail }) {
		return format(detail?.si_cutoff, 'dd MMM yyyy - hh:mm aaa');
	},
	vgmCutoff({ detail }) {
		return format(detail?.vgm_cutoff, 'dd MMM yyyy - hh:mm aaa');
	},
	gateInCutoff({ detail }) {
		return format(detail?.gate_in_cutoff, 'dd MMM yyyy - hh:mm aaa');
	},
	documentCutoff({ detail }) {
		return format(detail?.document_cutoff, 'dd MMM yyyy - hh:mm aaa');
	},
	trCutoff({ detail }) {
		return format(detail?.tr_cutoff, 'dd MMM yyyy - hh:mm aaa');
	},
	blCategory({ detail }) {
		return upperCase(detail.bl_category);
	},
	blType({ detail }) {
		return upperCase(detail.bl_type);
	},
	cargoReadinessDate({ detail }) {
		return format(detail?.cargo_readiness_date, 'dd MMM yyyy');
	},
	supplierPoc({ detail }) {
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
		return formatPocData(detail?.supplier_poc || {});
	},
	originOverseaAgent({ detail }) {
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
		return formatPocData(detail?.origin_oversea_agent || {});
	},
	shipperDetails({ detail }) {
		const formatShipperDetails = (shipperDetails) => (
			<div>
				<div>{shipperDetails?.name}</div>
				<div>{shipperDetails?.address}</div>
			</div>
		);
		return formatShipperDetails(detail?.shipper_details || {});
	},
	buyQuotationAgreedRates({ detail }) {
		return `${detail?.buy_quotation_agreed_rates.toFixed(2)} USD`;
	},
	hsCode({ detail }) {
		return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;
	},

	deliveryDate({ detail }) {
		return format(detail?.delivery_date, 'dd MMM yyyy');
	},

	containerLoadType({ detail }) {
		return startCase(detail?.container_load_type);
	},
};

export const renderValue = (label, detail) => {
	if (KEY_MAP[label]) {
		return details[KEY_MAP[label]]?.({ detail });
	}
	return detail[label] || null;
};
