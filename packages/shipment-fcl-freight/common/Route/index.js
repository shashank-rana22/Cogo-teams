import React, { useContext } from 'react';
import { IcMArrowRight } from '@cogoport/icons-react';
// import { ShipmentDetailContext } from '../../../commons/Context';
import possibleFullRouteConfigs from './possible-full-route.json';
import MainService from './MainService';
import ActiveService from './ActiveService';
import InactiveService from './InactiveService';
import Loader from './Loader';
import styles from './styles.module.css';
import { shipment_data } from '../../page-components/ShipmentDetails/Tabs/Overview/dummy_data';

const trasportationServices = [
	'ftl_freight_service',
	'trailer_freight_service',
	'ltl_freight_service',
];

let primary_service = {
    "id": "b7f3a877-4b77-4e34-a67e-c2ec6020aa9d",
    "shipment_id": "c491c741-7bd3-4d9e-a51c-e5472278abd7",
    "origin_port_id": "eb187b38-51b2-4a5e-9f3c-978033ca1ddf",
    "origin_country_id": "541d1232-58ce-4d64-83d6-556a42209eb7",
    "origin_trade_id": "d1e7b3ca-7518-4706-a644-e99d3aa2e0a9",
    "origin_continent_id": "a5fad8d7-ea33-4dab-82d6-e7097fbffee1",
    "destination_port_id": "23630ba9-b478-4000-ba75-05606d72d19f",
    "destination_country_id": "345f3aa9-ae78-40cf-b70a-fc5c3af2af99",
    "destination_trade_id": "0cd3ac76-ee4e-4178-9511-8cf93caf045b",
    "destination_continent_id": "4a4c0a00-1cc6-4662-822b-b2655c783ee8",
    "origin_main_port_id": null,
    "destination_main_port_id": null,
    "container_size": "40",
    "container_type": "standard",
    "commodity": "general",
    "hs_code": {
        "id": "10912692-9ddc-4b99-b87d-5cb829f35314",
        "hs_code_name": "10cereals"
    },
    "commodity_description": "sadffdcew",
    "is_hazardous": false,
    "refer_temperature": null,
    "refer_humidity": null,
    "refer_humidity_unit": null,
    "refer_vent_setting": null,
    "refer_ventilation": null,
    "refer_ventilation_unit": null,
    "shipping_line_id": "c3649537-0c4b-4614-b313-98540cffcf40",
    "service_provider_id": "f06d843c-88b1-42fa-82be-f40e68f6fb65",
    "inco_term": "cif",
    "containers_count": 1,
    "cargo_weight_per_container": 18,
    "source": "spot_booking",
    "origin_cargo_handling_type": null,
    "destination_cargo_handling_type": null,
    "selected_schedule_departure": "2023-03-22T00:00:00.000Z",
    "selected_schedule_arrival": "2023-03-30T00:00:00.000Z",
    "bls_count": 1,
    "bl_type": "sob",
    "state": "completed",
    "is_active": true,
    "cancellation_reason": null,
    "cancelled_by_org_id": null,
    "free_days_detention_origin": 0,
    "free_days_detention_destination": 14,
    "free_days_demurrage_destination": 0,
    "free_days_plugin_origin": 0,
    "free_days_plugin_destination": 0,
    "schedule_departure": "2023-03-27T20:32:00.000Z",
    "schedule_arrival": "2023-03-29T13:00:00.000Z",
    "movement_details": [
        {
            "service_type": "fcl_freight_service",
            "to_port_id": "23630ba9-b478-4000-ba75-05606d72d19f",
            "to_airport_id": null,
            "to_port": "Jebel Ali (AEJEA), Dubai, United Arab Emirates",
            "to_airport": null,
            "from_port_id": "eb187b38-51b2-4a5e-9f3c-978033ca1ddf",
            "from_airport_id": null,
            "from_port": "Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India",
            "from_airport": null,
            "vessel": "dsf",
            "voyage": "dasfgds",
            "flight_number": null,
            "schedule_arrival": "2023-03-29T18:30:00+05:30",
            "schedule_departure": "2023-03-28T02:02:00+05:30"
        }
    ],
    "vgm_cutoff": "2023-03-15T07:36:00.000Z",
    "si_cutoff": "2023-03-16T07:36:00.000Z",
    "document_cutoff": "2023-03-17T07:36:00.000Z",
    "gate_in_cutoff": "2023-03-18T07:36:00.000Z",
    "tr_cutoff": "2023-03-20T07:36:00.000Z",
    "si_filed_at": "2023-03-15T08:23:00.000Z",
    "service_provider_poc_id": null,
    "service_provider_reference_id": null,
    "consignee_details": null,
    "reallocation_process_id": null,
    "created_at": "2023-03-15T07:16:13.830Z",
    "updated_at": "2023-03-15T09:09:55.626Z",
    "cargo_readiness_date": "2023-03-15",
    "stuffing_location_id": null,
    "stuffing_at": null,
    "cancellation_subreason": null,
    "cancellation_reason_comment": null,
    "bn_expiry": "2023-03-19T07:36:00.000Z",
    "paying_party_details": null,
    "paying_party_trade_contact_id": null,
    "booking_placed_at": null,
    "booking_reference_number": "1234",
    "bl_released_at": null,
    "agent_cancellation_reason": null,
    "booking_proof": null,
    "bl_category": "mbl",
    "can_change_booking_params_status": null,
    "booking_params": null,
    "booking_params_approval_proof": null,
    "can_purchase_invoice_create": false,
    "main_service_id": null,
    "preferred_container_pickup_location_id": "d6bc9552-b8c5-42a4-98df-c08dfaf530cb",
    "preferred_container_handover_location_id": "d68099de-bb62-44b6-8db9-3882d09335a4",
    "booking_rate_procurement_proof": null,
    "rate_reference_number": null,
    "cargo_stuffing_location": "qfds",
    "booking_note_delay_reason": null,
    "booking_reference_proof": "{\"success\"=>true, \"name\"=>\"Screenshot si_filing_update.png\", \"url\"=>\"https://cogoport-testing.sgp1.digitaloceanspaces.com/c6648f9ede6383f42f3a5ce0c5b32e1a/Screenshot%20si_filing_update.png\"}",
    "booking_reference_delay_reasons": [],
    "shipping_bill_numbers": [],
    "ams_filed_at": null,
    "alert_status_at": null,
    "do_validity": null,
    "cargo_value": null,
    "cargo_value_currency": null,
    "origin_customs_cleared_at": "2023-03-15T08:41:00.000Z",
    "destination_customs_cleared_at": "2023-03-15T09:09:00.000Z",
    "dpd_code": null,
    "preferred_shipping_line_id": "8b0f6780-1b22-4f80-b96c-bedb18711ac3",
    "nomination_email_received_at": null,
    "free_days_demurrage_origin": 0,
    "ams_scac_code": null,
    "ams_number": null,
    "carrier_scac_number": null,
    "service_type": "fcl_freight_service",
    "port": null,
    "origin_port": {
        "id": "eb187b38-51b2-4a5e-9f3c-978033ca1ddf",
        "name": "Jawaharlal Nehru (Nhava Sheva)",
        "display_name": "Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India",
        "pincode_id": "74a228a7-6fcb-4ebd-bd4e-dbd776359f3b",
        "port_code": "INNSA",
        "postal_code": "400707",
        "is_icd": false,
        "flag_icon_url": ""
    },
    "destination_port": {
        "id": "23630ba9-b478-4000-ba75-05606d72d19f",
        "name": "Jebel Ali",
        "display_name": "Jebel Ali (AEJEA), Dubai, United Arab Emirates",
        "pincode_id": null,
        "port_code": "AEJEA",
        "postal_code": null,
        "is_icd": false,
        "flag_icon_url": null
    },
    "preferred_container_pickup_location": {
        "id": "d6bc9552-b8c5-42a4-98df-c08dfaf530cb",
        "name": "Santa Rita",
        "display_name": "Santa Rita (BRSRR), Brazil, Sam",
        "pincode_id": null,
        "port_code": "BRSRR",
        "postal_code": null,
        "is_icd": false,
        "flag_icon_url": null
    },
    "preferred_container_handover_location": {
        "id": "d68099de-bb62-44b6-8db9-3882d09335a4",
        "name": "Blackburn",
        "display_name": "Blackburn (GBBLK), United Kingdom, Europe",
        "pincode_id": null,
        "port_code": "GBBLK",
        "postal_code": null,
        "is_icd": true,
        "flag_icon_url": null
    },
    "origin_main_port": null,
    "destination_main_port": null,
    "location": null,
    "origin_location": null,
    "destination_location": null,
    "pincode": null,
    "shipping_line": {
        "id": "c3649537-0c4b-4614-b313-98540cffcf40",
        "business_name": "MAERSK LINE INDIA PVT LTD",
        "short_name": "Maersk",
        "logo_url": "https://prod-cogoport.s3.ap-south-1.amazonaws.com/3341a08bd807a189547419c9f62fa050/Maersk%20Line.svg",
        "iata_code": null
    },
    "origin_airport": null,
    "destination_airport": null,
    "airport": null,
    "airline": null,
    "service_provider": {
        "id": "f06d843c-88b1-42fa-82be-f40e68f6fb65",
        "business_name": "AHI CARGO SOLUTION PRIVATE LIMITED",
        "trade_name": "AHI CARGO SOLUTIONS PVT LTD",
        "serial_id": 80949,
        "registration_number": "AAMCA3315R",
        "country_id": "541d1232-58ce-4d64-83d6-556a42209eb7",
        "cogo_entity_id": "ee09645b-5f34-4d2e-8ec7-6ac83a7946e1"
    },
    "port_of_loading": null
}, isGettingShipment = false;

const isTrasportationAvailable = (allServices, trade_type) => {
	const obj = allServices?.find(
		(service) =>
			trasportationServices.includes(service?.display_service_type) &&
			service?.trade_type === trade_type,
	);
	return !obj;
};

const getServiceData = (allServices, routeLeg) =>
	allServices?.find(
		(service) =>
			((routeLeg?.service_types || []).includes(service?.service_type) ||
				(routeLeg?.service_types || []).includes(
					service?.display_service_type,
				)) &&
			(!service?.trade_type ||
				!routeLeg?.trade_type ||
				service?.trade_type === routeLeg?.trade_type),
	);

const isServiceTakenFunc = (allServices, routeLeg) => {
	return (
		allServices?.filter(
			(service) =>
				(routeLeg?.service_types || []).includes(
					service?.display_service_type,
				) &&
				(!service?.trade_type ||
					!routeLeg?.trade_type ||
					service?.trade_type === routeLeg?.trade_type),
		)?.length > 0
	);
};

const isHaulageAvailable = (
	origin_port = {},
	destination_port = {},
	port = {},
	tradeType,
) => {
	if (tradeType === 'export') {
		return origin_port?.is_icd || port?.is_icd;
	}
	return destination_port?.is_icd || port?.is_icd;
};

const Route = ({ allServices = [], loading = false, refetch = () => {} }) => {
	// const [{ shipment_data, primary_service, isGettingShipment }] = useContext(
	// 	ShipmentDetailContext,
	// );
	const { source = '', shipment_type = '' } = shipment_data;

	const {
		origin_port = {},
		destination_port = {},
		port = {},
	} = primary_service;
	
	const mainServiceName = primary_service?.service_type;
	const possibleFullRoute = possibleFullRouteConfigs?.[mainServiceName];

	let possibleRoute = [];
	if (primary_service?.trade_type) {
		possibleRoute = (possibleFullRoute || []).filter(
			(item) =>
				item.mainServices || item?.trade_type === primary_service?.trade_type,
		);
	} else {
		possibleRoute = possibleFullRoute;
	}

	if (shipment_type === 'rail_domestic_freight') {
		possibleRoute = possibleFullRoute;
	}

	const isOriginTransportionAvailable = isTrasportationAvailable(
		allServices,
		'export',
	);
	const isDestinationTransportationAvailable = isTrasportationAvailable(
		allServices,
		'import',
	);

	const renderItem = (routeLeg) => {
		const isServiceTaken = isServiceTakenFunc(allServices, routeLeg);

		let isUpsellServiceAvailable = shipment_data?.state !== 'cancelled';

		if (
			!isServiceTaken &&
			isUpsellServiceAvailable &&
			trasportationServices.includes(routeLeg?.service_types?.[0])
		) {
			isUpsellServiceAvailable =
				(routeLeg.trade_type === 'export' && isOriginTransportionAvailable) ||
				(routeLeg.trade_type === 'import' &&
					isDestinationTransportationAvailable);
		}

		if (
			!isServiceTaken &&
			isUpsellServiceAvailable &&
			routeLeg?.service_types?.[0] === 'haulage_freight_service'
		) {
			isUpsellServiceAvailable = isHaulageAvailable(
				origin_port,
				destination_port,
				port,
				routeLeg.trade_type,
			);
		}

		if (
			shipment_data?.is_job_closed ||
			(source === 'consol' && shipment_type === 'domestic_air_freight')
		) {
			isUpsellServiceAvailable = false;
		}

		if ('seperator' in routeLeg) {
			return (
				<div className={styles.arrow_container}>
					<IcMArrowRight height={28} width={28} />
				</div>
			);
		}

		if ('mainServices' in routeLeg) {
			return (
				<MainService
					allServices={allServices}
					routeLeg={routeLeg}
					data={getServiceData(allServices, routeLeg) || primary_service}
					shipment_data={shipment_data}
					primary_service={primary_service}
					refetch={refetch}
				/>
			);
		}

		if (isServiceTaken) {
			return (
				<ActiveService
					routeLeg={routeLeg}
					data={getServiceData(allServices, routeLeg) || primary_service}
				/>
			);
		}

		return (
			<InactiveService
				routeLeg={routeLeg}
				shipment_data={shipment_data}
				services={allServices}
				isUpsellServiceAvailable={isUpsellServiceAvailable}
			/>
		);
	};

	return (
		<div className={styles.container}>
			{isGettingShipment || loading ? (
				<Loader />
			) : (
				<div className={styles.route_wrap}>
					{(possibleRoute || []).map((routeLeg) => renderItem(routeLeg))}
				</div>
			)}
		</div>
	);
};

export default Route;
