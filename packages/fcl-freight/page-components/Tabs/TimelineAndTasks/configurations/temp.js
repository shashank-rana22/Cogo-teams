const fs = require('fs');

const tasks = [
	'update_airway_bill_type',
	'update_cargo_picked_up_date',
	'update_invoice_currency',
	'update_cargo_clearance_date',
	'update_cargo_readiness_date',
	'update_origin_cargo_handling_type',
	'update_destination_cargo_handling_type',
	'update_commodity_name_hs_code_description',
	'update_stuffing_details',
	'update_cargo_stuffing_location',
	'update_refer_conditions',
	'update_ftl_origin_pickup_date_and_time',
	'update_trailer_origin_stuffing_date_and_time',
	'update_trailer_destination_delivery_date_and_time',
	'update_trailer_stuffing_date_and_time',
	'update_trailer_delivery_date_and_time',
	'update_cargo_pickup_date_and_time',
	'update_preferred_container_pickup_location',
	'update_preferred_container_handover_location',
];

const taskName = [
	'Update Airway Bill Type',
	'Update Cargo Picked Up Date',
	'Update Invoice Currency',
	'Update Cargo Clearance Date',
	'Update Cargo Readiness Date',
	'Update Origin Cargo Handling Type',
	'Update destination cargo handling type',
	'Update Commodity Name Hs Code Description',
	'Update Stuffing Details',
	'Update Cargo Stuffing Location',
	'Update Refer Conditions',
	'Update Ftl Origin Pickup Date And Time',
	'Update Trailer Origin Stuffing Date And Time',
	'Update Trailer Destination Delivery Date And Time',
	'Update Trailer Stuffing Date And Time',
	'Update Trailer Delivery Date And Time',
	'Update Cargo Pickup Date And Time',
	'Update Preferred Container Pickup Location',
	'Update Preferred Container Handover Location',
];

const configs = {};

tasks.forEach((element, index) => {
	configs[element] = {
		display: taskName[index],
		why_needed: '',
		buttons: [
			{
				name: 'add_clearance_date',
				text: 'SUBMIT',
				props: { className: 'secondary sm' },
			},
		],
	};
});

fs.writeFileSync('buttons.js', JSON.stringify(configs));
