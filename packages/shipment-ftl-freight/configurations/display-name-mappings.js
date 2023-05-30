/* eslint-disable max-len */
const displayNameMappings = (trade_type) => {
	const displayNames = {
		update_container_offloaded_at: {
			display_name: 'Update Conatiner offloaded at Port',
		},
		upload_eway_bill_copy: {
			display_name: 'Upload E-Way Bill',
		},
		mark_cargo_handed_over_status: {
			display_name: 'Mark Cargo handed over',
		},
		mark_cargo_handed_over: {
			display_name: 'Mark Cargo handed over',
		},
		mark_in_progress: {
			display_name: 'Mark Cargo departed',
		},
		update_booking_reference_number: {
			display_name: 'Add Booking Reference Number',
		},
		update_containers_arrived_cfs_at: {
			display_name: 'Update Containers Arrived at Destination CFS',
		},
		upload_si: {
			display_name : 'Upload Shipping Instruction',
			activity     : 'uploaded shipping instruction',
			addPrefix    : false,
			why_needed   : '',
		},
		update_carrier_booking_reference_number: {
			display_name: 'Update Booking placed',
		},
		upload_shipping_instruction: {
			display_name : 'Upload Shipping Instruction',
			activity     : 'uploaded shipping instruction',
			addPrefix    : false,
			why_needed   : '',
		},
		update_shipping_instruction_filed_at: {
			display_name : 'Update Shipping Instructions filing status',
			activity     : 'marked SI status as filed',
			addPrefix    : false,
			why_needed:
				'Required by the carrier to onboard the cargo and should be done before cut-off to avoid late fee',
		},
		update_si_filed_at: {
			display_name : 'Update Shipping Instructions filing status',
			activity     : 'marked SI status as filed',
			addPrefix    : false,
			why_needed:
				'Required by the carrier to onboard the cargo and should be done before cut-off to avoid late fee',
		},
		upload_cargo_arrival_notice: {
			display_name : 'Upload Cargo Arrival Notice',
			why_needed   : 'Notify to Importer/Exporter about the cargo arrival.',
		},
		upload_shipping_bill: {
			display_name : 'Upload Shipping Bill with LEO',
			why_needed   : 'Required by forwarder to handover shipment to the carrier',
		},
		upload_final_invoice: {
			display_name: 'Upload Vendor Invoice',
		},
		upload_bill_of_lading: {
			display_name: 'Upload Bill of Lading',
		},
		release_bill_of_lading: {
			display_name: 'Bill of Lading Released at',
		},
		upload_delivery_order: {
			display_name: 'Upload Delivery Order',
		},
		upload_invoice: {
			display_name : 'Upload Commercial Invoice',
			activity     : 'uploaded invoice',
			addPrefix    : false,
		},
		approve_booking_params: {
			display_name: 'Approve changed booking parameters',
		},
		approve_purchase_invoice_for_fcl_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_fcl_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_fcl_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_lcl_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_lcl_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_air_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_air_freight_local_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_trailer_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_trailer_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_ftl_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_ftl_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_fcl_customs_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_fcl_customs_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_fcl_cfs_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_fcl_cfs_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_origin_haulage_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		approve_purchase_invoice_for_destination_haulage_freight_service: {
			display_name: 'Verify purchase invoice details',
		},
		upload_boe_checklist: {
			display_name: 'Upload Import BOE Checklist',
		},
		add_booking_reference_number: {
			display_name : 'Add Booking Reference Number',
			activity     : 'updated booking reference number',
			addPrefix    : false,
		},
		update_invoice_currency: {
			display_name : 'Choose invoice currency',
			activity     : 'updated invoice currency',
			addPrefix    : false,
			why_needed   : 'invoice will be made in the currency you choose.',
		},
		update_commodity_name_hs_code_description: {
			display_name : 'Update cargo details ',
			activity     : 'updated cargo details',
			addPrefix    : false,
		},
		cargo_pick_up_date_time: {
			display_name : 'Choose Container pickup time',
			activity     : 'updated Container pickup time',
			addPrefix    : false,
			why_needed:
				'Tell us when the transportation should arrive at factory or warehouse for loading of the cargo. This will then be taken to the port for stuffing.',
		},
		update_cargo_value: {
			display_name : 'Update Cargo Value',
			activity     : 'updated Cargo Value',
			addPrefix    : false,
		},
		update_documentation_poc_details: {
			display_name : 'Add Documentation POC',
			activity     : 'added documentation POC',
			addPrefix    : false,
			why_needed:
				'Appoint a person on team, so we can contact them for documentation required to complete the shipment',
		},
		update_finance_poc_details: {
			display_name : 'Add Finance POC',
			activity     : 'added finance POC',
			addPrefix    : false,
			why_needed:
				'Appoint a person on finance team, who will manage invoices and payments',
		},
		update_origin_transport_poc_details: {
			display_name : 'Add origin transporter details',
			activity     : 'added origin transporter details',
			addPrefix    : false,
			why_needed:
				'In order to ensure smooth transfer and import of shipment, please provide us with the contact details of the person who handled transportation at the origin location. These details will only be used to make sure shipment reaches you smoothly',
		},
		update_origin_customs_poc_details: {
			display_name : 'Add origin customs provider details',
			activity     : 'added origin customs provider details',
			addPrefix    : false,
			why_needed:
				'In order to ensure smooth transfer and import of shipment, please provide us with the contact details of the person who customs clearance at the origin location. These details will only be used to make sure shipment reaches you smoothly',
		},
		update_destination_transport_poc_details: {
			display_name : 'Add destination transporter details',
			activity     : 'added destination transporter details',
			addPrefix    : false,
			why_needed:
				'Provide us with the contact details of the person who will handle transportation at the destination location',
		},
		update_destination_customs_poc_details: {
			display_name : 'Add destination customs provider details',
			activity     : 'added destination customs provider details',
			addPrefix    : false,
			why_needed:
				'Provide us with the contact details of the person who will handle transportation at the destination location',
		},
		update_factory_warehouse_poc: {
			display_name : 'Add contact person at the factory or warehouse',
			activity     : 'added contact person at the factory or warehouse',
			addPrefix    : false,
			why_needed:
				'Provide us with contact details of the person we need to call in order to ensure the cargo is picked up from factory or warehouse',
		},
		update_bl_type: {
			display_name : 'Choose preferred Bill of Lading',
			activity     : 'Bill of lading details',
			why_needed:
				'You may choose between RFS, SOB or Sea Waybill. Some carriers may not issue Sea Waybill type BL on certain routes. We will check with the carrier and get back to you if changes need to be made. Further, additional charges may apply for Sea Waybills. This will be shown in price break-up.',
		},
		update_billing_address: {
			display_name : 'Choose Billing Address',
			activity     : 'billing address',
			why_needed   : 'Duty & taxes apply as per the billing address chosen by you',
		},
		approve_fcl_freight_service_amended_quote: {
			display_name : 'Quotation for FCL freight has been updated',
			activity     : 'accepted the updated quotation for FCL freight',
			addPrefix    : false,
			why_needed:
				'Service Provider has updated the quotation for FCL freight. Please review and accept.',
		},
		amend_booking_note: {
			display_name : 'Amend booking note',
			activity     : 'amended booking note',
			addPrefix    : false,
			why_needed   : 'Shipper has requested for booking note amendment',
		},
		update_invoice_combination: {
			display_name : 'Choose how you would like invoice',
			activity     : 'invoice preference',
			why_needed:
				'Would you like 1 invoice for all the services? Or separate invoices for certain services? Please choose how you would like to distribute services across invoices.',
		},
		update_cargo_readiness_date: {
			display_name : 'Provide Container Pickup Date',
			activity     : 'Container Pickup Date',
			why_needed:
				'Container Pickup Date is date by which cargo is ready to be shipped from warehouse or factory',
		},
		upload_msds_certificate: {
			display_name : 'Upload MSDS certificate',
			activity     : 'MSDS certificate',
			why_needed:
				'Only applicable for HAZ class commodities: It provides the instructions and the full requirements for handling haz class cargo and it must be created by the manufacturer of the product as they would have full information on the item',
		},
		upload_iip_certificate: {
			display_name: 'Upload IIP certificate',
			why_needed:
				'This is a UN certification made mandatory by govts and carriers to ensure right packaging of the HAZ commodity',
		},
		mark_confirmed: {
			display_name : 'Confirm Booking',
			activity     : 'confirmed booking',
			addPrefix    : false,
			why_needed   : "It's a confirmation for other party",
		},
		approve_booking_note: {
			display_name : 'Verify booking note details',
			activity     : 'booking note details',
			why_needed:
				'Please verify the booking note uploaded by the carrier. Please make sure the document is accurate in order to avoid financial losses and time delays',
		},
		mark_container_picked_up: {
			display_name : 'Update container pick up status',
			activity     : 'marked containers as picked up',
			addPrefix    : false,
			why_needed:
				'This information is required so that the forwarder can initiate the shipment process with the carrier',
		},
		update_container_details: {
			display_name : 'Add container details',
			activity     : 'updated container details',
			addPrefix    : false,
			why_needed:
				'Adding this enables tracking of the containers to ensure timely delivery',
		},
		upload_container_arrival_notice: {
			display_name: 'Upload cargo arrival notice',
		},
		approve_draft_bill_of_lading: {
			display_name: 'Verify draft Bill of Lading details',
			why_needed:
				'Please make sure the details are accurate. This will avoid handover issues at the destination port',
		},
		upload_packing_list: {
			display_name : 'Upload packing list',
			activity     : 'uploaded packing list',
			addPrefix    : false,
			why_needed:
				'Please upload a list of products you are shipping. This document will be used to prepare the instructions for the carrier',
		},
		upload_commercial_invoice: {
			display_name: 'Upload Commercial Invoice',
			why_needed:
				'Required to prepare the shipping instructions for the shipping line',
		},
		approve_checklist: {
			display_name: 'Verify checklist',
			why_needed:
				'Ensure the details are correct to avoid any delay in custom clearance',
		},
		update_consignee_details: {
			display_name : 'Update consignee details',
			why_needed   : null,
		},
		upload_booking_note: {
			display_name:
				trade_type === 'import'
					? 'Upload Shipping Order'
					: 'Upload Booking Note',
			why_needed:
				'Serves as confirmation for the customer and document required to pick containers from yard',
		},
		mark_container_gated_in: {
			display_name : 'Update gate-in status at Main Port',
			activity     : 'Containers gated in',
			addPrefix    : false,
			addUser      : false,
			why_needed   : 'Customer can now be happy that their cargo will sail',
		},
		upload_draft_bill_of_lading: {
			display_name: 'Upload Draft BL',
			why_needed:
				'Get the BL content reviewed by the shipper/consignee before generating the final copy',
		},
		mark_vessel_departed: {
			display_name : 'Update vessel departure status at origin',
			activity     : 'Vessel departed',
			addPrefix    : false,
			addUser      : false,
			why_needed   : 'Status update for the shipper',
		},
		mark_vessel_departure_status: {
			display_name : 'Update vessel departure status at origin',
			activity     : 'Vessel departed',
			addPrefix    : false,
			addUser      : false,
			why_needed   : 'Status update for the shipper',
		},
		mark_vessel_arrived: {
			display_name : 'Update vessel arrival at destination',
			activity     : 'Vessel arrived',
			addPrefix    : false,
			addUser      : false,
			why_needed   : 'Status update for the shipper',
		},
		mark_container_gated_out: {
			display_name : 'Mark Container Gated Out of Port',
			activity     : 'Container gate-out',
			addPrefix    : false,
			addUser      : false,
			why_needed   : 'Status update for the shipper',
		},
		mark_completed: {
			display_name : 'Mark shipment as complete',
			why_needed   : null,
		},
		update_refer_conditions: {
			display_name : 'Choose preferred reefer settings',
			activity     : 'updated reefer settings',
			addPrefix    : false,
			why_needed:
				'Required by service providers to ensure the genset settings are optimal for cargo',
		},
		update_ltl_origin_pickup_details: {
			display_name : 'Add location for cargo pickup at origin',
			activity     : 'updated pickup location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_ltl_destination_pickup_details: {
			display_name : 'Add location for cargo pickup at destination',
			activity     : 'updated pickup location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_trailer_origin_pickup_details: {
			display_name : 'Add location for cargo pickup at origin',
			activity     : 'updated pickup location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_trailer_destination_pickup_details: {
			display_name : 'Add location for cargo pickup at destination',
			activity     : 'updated pickup location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_ftl_origin_pickup_details: {
			display_name : 'Add location for cargo pickup at origin',
			activity     : 'updated pickup location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_ftl_destination_pickup_details: {
			display_name : 'Add location for cargo pickup at destination',
			activity     : 'updated pickup at destination location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from? Please be as specific as possible, and provide us with the address.',
		},
		update_trailer_pickup_drop_details: {
			display_name : 'Add location for cargo pickup and drop off',
			activity     : 'updated pickup and drop off location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from  and dropped at? Please be as specific as possible, and provide us with the address.',
		},
		update_ltl_pickup_drop_details: {
			display_name : 'Add location for cargo pickup and drop off',
			activity     : 'updated pickup and drop off location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from and dropped at? Please be as specific as possible, and provide us with the address.',
		},
		update_ftl_pickup_drop_details: {
			display_name : 'Add location for cargo pickup and drop off off',
			activity     : 'updated pickup and drop off location details',
			addPrefix    : false,
			why_needed:
				'Where would you like cargo to be picked up from  and dropped at? Please be as specific as possible, and provide us with the address.',
		},
		upload_letter_of_indemnity: {
			display_name : 'Upload letter of indemnity',
			activity     : 'uploaded letter of indemnity',
			addPrefix    : false,
			why_needed:
				'Required by the shipping line to indemnify them from any damage done to the cargo because it was not stuffed at the right temperature. This is a standard document.',
		},
		upload_address_proof: {
			display_name : 'Upload address proof',
			activity     : 'uploaded address proof',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_apeda: {
			display_name : 'Upload apeda',
			activity     : 'uploaded apeda',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_arrival_notice: {
			display_name : 'Upload arrival notice',
			activity     : 'uploaded arrival notice',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_authority_letter_custom: {
			display_name : 'Upload authority letter custom',
			activity     : 'uploaded authority letter custom',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_authority_letter_vgm: {
			display_name : 'Upload authority letter vgm',
			activity     : 'uploaded authority letter vgm',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_bill_of_entry: {
			display_name : 'Upload Bill of Entry',
			activity     : 'uploaded bill of entry',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_bl_amendment: {
			display_name : 'Upload bl amendment',
			activity     : 'uploaded bl amendment',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_bl_instructions: {
			display_name : 'Upload bl instructions',
			activity     : 'uploaded bl instructions',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_carting_order: {
			display_name : 'Upload Carting Order',
			activity     : 'uploaded carting order',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_carting_permission: {
			display_name : 'Upload carting permission',
			activity     : 'uploaded carting permission',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_checklist: {
			display_name : 'Upload Checklist',
			activity     : 'uploaded checklist',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_closing_document: {
			display_name : 'Upload closing document',
			activity     : 'uploaded closing document',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_COGO_CREDIT_NOTE: {
			display_name : 'Upload COGO CREDIT NOTE',
			activity     : 'uploaded COGO CREDIT NOTE',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_COGO_DEBIT_NOTE: {
			display_name : 'Upload COGO DEBIT NOTE',
			activity     : 'uploaded COGO DEBIT NOTE',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_COGO_INVOICE: {
			display_name : 'Upload COGO INVOICE',
			activity     : 'uploaded COGO INVOICE',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_containers_info_xls_upload: {
			display_name : 'Upload containers info xls upload',
			activity     : 'uploaded containers info xls upload',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_container_survey_report: {
			display_name : 'Upload Container Survey Report',
			activity     : 'uploaded container survey report',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_credit_agreement: {
			display_name : 'Upload credit agreement',
			activity     : 'uploaded credit agreement',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_draft_house_airway_bill: {
			display_name : 'Upload Draft House Airway Bill',
			activity     : 'uploaded draft house airway bill',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_draft_si: {
			display_name : 'Upload Draft Shipping Instruction',
			activity     : 'uploaded draft si',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_escalation_ticket_comment: {
			display_name : 'Upload escalation ticket comment',
			activity     : 'uploaded escalation ticket comment',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_export_customs_entry: {
			display_name : 'Upload export customs entry',
			activity     : 'uploaded export customs entry',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_form_13: {
			display_name : 'Upload form 13',
			activity     : 'uploaded form 13',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_gst: {
			display_name : 'Upload gst',
			activity     : 'uploaded gst',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_house_airway_bill: {
			display_name : 'Upload house airway bill',
			activity     : 'uploaded house airway bill',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_house_airway_bill_amendment: {
			display_name : 'Upload house airway bill amendment',
			activity     : 'uploaded house airway bill amendment',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_house_airway_bill_instructions: {
			display_name : 'Upload house airway bill instructions',
			activity     : 'uploaded house airway bill instructions',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_house_bill_of_lading: {
			display_name : 'Upload house bill of lading',
			activity     : 'uploaded house bill of lading',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_igm_document: {
			display_name : 'Upload igm document',
			activity     : 'uploaded igm document',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_importer_exporter_code: {
			display_name : 'Upload importer exporter code',
			activity     : 'uploaded importer exporter code',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_checklist: {
			display_name : 'Upload import checklist',
			activity     : 'uploaded import checklist',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_commercial_invoice: {
			display_name : 'Upload import commercial invoice',
			activity     : 'uploaded import commercial invoice',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_customs_entry: {
			display_name : 'Upload import customs entry',
			activity     : 'uploaded import customs entry',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_license_document: {
			display_name : 'Upload import license document',
			activity     : 'uploaded import license document',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_packing_list: {
			display_name : 'Upload import packing list',
			activity     : 'uploaded import packing list',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_internal_notes: {
			display_name : 'Upload internal notes',
			activity     : 'uploaded internal notes',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_let_export_order: {
			display_name : 'Upload let export order',
			activity     : 'uploaded let export order',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_license_document: {
			display_name : 'Upload license document',
			activity     : 'uploaded license document',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_airway_bill: {
			display_name : 'Upload airway bill',
			activity     : 'uploaded airway bill',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_master_bill_of_lading: {
			display_name : 'Upload master bill of lading',
			activity     : 'uploaded master bill of lading',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_measurement_slip: {
			display_name : 'Upload measurement slip',
			activity     : 'uploaded measurement slip',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_other: {
			display_name : 'Upload other',
			activity     : 'uploaded other',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_out_of_charge: {
			display_name : 'Upload out of charge',
			activity     : 'uploaded out of charge',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_pan: {
			display_name : 'Upload pan',
			activity     : 'uploaded pan',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_phyto: {
			display_name : 'Upload Phyto',
			activity     : 'uploaded phyto',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_proforma: {
			display_name : 'Upload proforma',
			activity     : 'uploaded proforma',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_registration_number: {
			display_name : 'Upload registration number',
			activity     : 'uploaded registration number',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_shipment_buyer_comment: {
			display_name : 'Upload shipment buyer comment',
			activity     : 'uploaded shipment buyer comment',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_shipment_comment: {
			display_name : 'Upload shipment comment',
			activity     : 'uploaded shipment comment',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_shipment_seller_comment: {
			display_name : 'Upload shipment seller comment',
			activity     : 'uploaded shipment seller comment',
			addPrefix    : false,
			why_needed   : '',
		},

		upload_stuffing_report: {
			display_name : 'Upload stuffing report',
			activity     : 'uploaded stuffing report',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_supplementary_bill_of_lading: {
			display_name : 'Upload supplementary bill of lading',
			activity     : 'uploaded supplementary bill of lading',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_supplementary_draft_bill_of_lading: {
			display_name : 'Upload supplementary draft bill of lading',
			activity     : 'uploaded supplementary draft bill of lading',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_system_prefilled_si: {
			display_name : 'Upload system prefilled si',
			activity     : 'uploaded system prefilled si',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_tax_number: {
			display_name : 'Upload tax number',
			activity     : 'uploaded tax number',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_utility_bill: {
			display_name : 'Upload utility bill',
			activity     : 'uploaded utility bill',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_vgm: {
			display_name : 'Upload vgm',
			activity     : 'uploaded vgm',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_vgm_receipts: {
			display_name : 'Upload vgm receipts',
			activity     : 'uploaded vgm receipts',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_vgm_sample_xls: {
			display_name : 'Upload vgm sample xls',
			activity     : 'uploaded vgm sample xls',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_vgm_xls: {
			display_name : 'Upload vgm xls',
			activity     : 'uploaded vgm xls',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_t1_document: {
			display_name : 'Upload t1 document',
			activity     : 'uploaded t1 document',
			addPrefix    : false,
			why_needed   : '',
		},
		upload_import_safety_and_security_declaration: {
			display_name : 'Upload import safety and security declaration',
			activity     : 'uploaded import safety and security declaration',
			addPrefix    : false,
			why_needed   : '',
		},
	};

	return displayNames;
};

export default displayNameMappings;
