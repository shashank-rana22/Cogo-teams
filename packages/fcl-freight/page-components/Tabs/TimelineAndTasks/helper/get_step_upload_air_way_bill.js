import { date } from '@cogo/date';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';

const getExtraControls = {
	air_booking_note: [
		{
			label: 'Booking Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Booking Note Number is required' },
			],
		},
	],
	igm_document: [
		{
			label: 'IGM Number',
			name: 'igm_number',
			type: 'text',
			span: 6,
			validations: [{ type: 'required', message: 'IGM Number is required' }],
		},
	],
	draft_bill_of_lading: [
		{
			label: 'Bill of lading Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [{ type: 'required', message: 'BL Number is required' }],
		},
	],
	draft_house_bill_of_lading: [
		{
			label: 'Bill of lading Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [{ type: 'required', message: 'BL Number is required' }],
		},
	],
	bill_of_lading: [
		{
			label: 'Bill of lading Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			disabled: true,
			validations: [{ type: 'required', message: 'BL Number  is required' }],
		},
		{
			label: '',
			name: 'bl_detail_id',
			type: 'text',
			show: false,
		},
	],
	house_bill_of_lading: [
		{
			label: 'Bill of lading Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			disabled: true,
			validations: [{ type: 'required', message: 'BL Number  is required' }],
		},
		{
			label: '',
			name: 'bl_detail_id',
			type: 'text',
			show: false,
		},
	],
	shipping_bill: [
		{
			label: 'Shipping bill Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Shipping bill Number  is required' },
			],
		},
		{
			name: 'fob_currency',
			label: 'FOB Currency',
			type: 'select-2',
			optionsListKey: 'currencies',
			value: GLOBAL_CONSTANTS.currency_code.USD,
			span: 6,
			validations: [{ type: 'required', message: 'FOB Currency is required' }],
		},
		{
			name: 'shipment_fob_value',
			label: 'FOB Amount',
			type: 'number',
			span: 6,
			isShowStepprr: false,
			validations: [{ type: 'required', message: 'FOB Amount is required' }],
		},
	],
	delivery_order: [
		{
			label: 'Delivery order number',
			name: 'delivery_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Delivery Number  is required' },
			],
		},
		{
			label: 'Docment Issue Date',
			name: 'document_issue_date',
			type: 'datepicker',
			withTimePicker: true,
			isPreviousDaysAllowed: true,
			span: 6,
			validations: [{ type: 'required', message: 'Issue Date  is required' }],
		},
		{
			label: 'Docment Expiry Date',
			name: 'document_expiry_date',
			type: 'datepicker',
			withTimePicker: true,
			span: 6,
			validations: [{ type: 'required', message: 'Expiry Date  is required' }],
		},
	],
	booking_note: [
		{
			label: 'Booking Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Booking Number  is required' },
			],
		},
		{
			label: 'Yard Details',
			name: 'yard_details',
			type: 'location-select',
			optionsListKey: 'locations',
			params: { filters: { type: ['yard'] } },
			caret: true,
			popoverWidth: '500px',
			defaultOptions: true,
			span: 6,
			validations: [{ type: 'required', message: 'Yard Details is required' }],
		},
		{
			label: 'Container Quantity',
			name: 'container_quantity',
			type: 'number',
			span: 6,
			validations: [
				{ type: 'required', message: 'Container Quantity is required' },
			],
		},
	],
	bill_of_entry: [
		{
			label: 'Bill of entry Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Bill of entry Number  is required' },
			],
		},
		{
			name: 'fob_currency',
			label: 'FOB Currency',
			type: 'select-2',
			optionsListKey: 'currencies',
			value: GLOBAL_CONSTANTS.currency_code.USD,
			span: 6,
			validations: [{ type: 'required', message: 'FOB Currency is required' }],
		},
		{
			name: 'fob_value',
			label: 'FOB Amount',
			type: 'number',
			span: 6,
			isShowStepprr: false,
			validations: [{ type: 'required', message: 'FOB Amount is required' }],
		},
	],
	house_airway_bill: [
		{
			label: 'Airway bill Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			disabled: true,
			validations: [{ type: 'required', message: 'Airway bill  is required' }],
		},
	],
	airway_bill: [
		{
			label: 'Airway bill Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			disabled: true,
			validations: [{ type: 'required', message: 'Airway bill  is required' }],
		},
	],
	draft_house_airway_bill: [
		{
			label: 'Draft Airway bill Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Draft Airway bill  is required' },
			],
		},
	],
	draft_airway_bill: [
		{
			label: 'Draft Airway bill Number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Draft Airway bill  is required' },
			],
		},
	],
	export_customs_entry: [
		{
			label: 'Export customs entry number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Export customs entry  is required' },
			],
		},
	],
	import_customs_entry: [
		{
			label: 'Import customs entry number',
			name: 'document_number',
			type: 'text',
			span: 6,
			validations: [
				{ type: 'required', message: 'Import customs entry is required' },
			],
		},
	],
	invoice: [
		{
			name: 'cargo_currency',
			label: 'Cargo Currency',
			optionsListKey: 'currencies',
			type: 'select',
			span: 6,
			validations: [{ type: 'required', message: 'Currency is required' }],
		},
		{
			label: 'Cargo Value',
			name: 'cargo_value',
			type: 'number',
			span: 6,
			min: 1,
			validations: [
				{ type: 'required', message: 'Cargo Value is required' },
				{
					type: 'min',
					message: 'Container Quantity cannot be less than 1',
					min: 1,
				},
			],
		},
	],
};

export const getControls = (data, type = null) => {
	const containers_count = [
		{
			label: 'Container Quantity',
			name: 'containers_count',
			type: 'number',
			span: 6,
			min: 1,
			validations: [
				{ type: 'required', message: 'Container Quantity is required' },
				{
					type: 'min',
					message: 'Container Quantity cannot be less than 1',
					min: 1,
				},
			],
		},
	];

	const controls =
		getExtraControls[type] || getExtraControls[data.document_type] || [];
	const bls = ['draft_bill_of_lading', 'draft_house_bill_of_lading'];
	if (
		data.shipment_type === 'fcl_freight' &&
		bls.includes(data.document_type)
	) {
		return [...controls, ...containers_count];
	}
	return controls;
};

const taskName = 'upload_doc';

const getInitialValues = (summary) => {
	const value = [
		{
			from_airport_id: summary?.origin_airport?.id,
			to_airport_id: summary?.destination_airport?.id,
			schedule_departure: date(summary?.schedule_departure),
			schedule_arrival: date(summary?.schedule_arrival),
			service_type: 'air_freight_service',
		},
	];
	return value;
};

const getValues = (document_type, data) => {
	if (
		document_type === 'airway_bill' ||
		document_type === 'house_airway_bill'
	) {
		const filterdList = (data.list || []).filter(
			(item) => item.bl_document_type === `draft_${document_type}`,
		);
		const values = filterdList.map((item) => ({
			document_number: item.bl_number,
			bl_detail_id: item.id,
		}));
		return values;
	}
	return null;
};

const getStepConfig = (type, shipment_data, data) => {
	const category = shipment_data?.bl_category?.toLowerCase();
	const askFoMore =
		type === 'airway_bill' && data.shipment_type === 'air_freight';
	const askMoreDetails = askFoMore ? { type: 'bl', isConfirm: true } : null;
	if (
		category === 'hbl' &&
		(type === 'airway_bill' || type === 'draft_airway_bill')
	) {
		return { bls_count: 1, askMoreDetails };
	}
	return { bls_count: shipment_data?.bls_count || 1, askMoreDetails };
};

const getStep = (type, isLast = false, data, shipment_data) => {
	const { bls_count } = getStepConfig(type, shipment_data, data);
	let dataFromApi = [
		{
			key_from_api: 'task_field_id',
			key_to_send: 'id',
			alternative: 'undefined',
		},
		{ key_from_api: 'shipment_id', key_to_send: 'shipment_id' },
		{
			key_from_api: 'service_id',
			key_to_send: 'service_id',
			alternative: 'undefined',
		},
		{
			key_from_api: 'service_type',
			key_to_send: 'service_type',
			alternative: 'undefined',
		},
		{ key_from_api: type, key_to_send: 'document_type' },
		{
			key_from_api: 'user_id',
			key_to_send: 'uploaded_by_org_id',
			alternative: 'undefined',
		},
	];
	if (isLast) {
		dataFromApi = [
			...dataFromApi,
			{
				key_from_api: 'id',
				key_to_send: 'pending_task_id',
				alternative: 'undefined',
			},
		];
	}
	return {
		name: taskName,
		end_point: 'create_shipment_document',
		date_from_api: dataFromApi,
		controls: [
			{
				name: 'documents',
				type: 'fieldArray',
				showButtons: false,
				showDeleteButton: true,
				heading: 'Document',
				showDivider: true,
				isSectionRequired: true,
				value: getValues(type, data),
				initialCount: bls_count,
				noDeleteButtonTill: bls_count,
				controls: [
					{
						label: 'Document Description (optional)',
						name: 'description',
						type: 'textarea',
						span: 12,
						rows: 2,
					},
					...(getExtraControls[type] || []),
					{
						name: 'url',
						showLabel: false,
						span: 12,
						type: 'file',
						themeType: 'secondary',
						drag: true,
						isShipment: true,
						uploadIcon: 'ic-upload',
						document_type: type,
						label: '',
						accept:
							'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						uploadType: 'aws',
						validations: [
							{
								type: 'required',
								message: 'document is required',
							},
						],
					},
				],
			},
		],
	};
};

const configs = (data, shipment_data) => {
	const config = {
		hawb: {
			upload_airway_bill: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['house_airway_bill', 'airway_bill'],
			},
			upload_draft_airway_bill: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_house_airway_bill', 'draft_airway_bill'],
			},
		},
		mawb: {
			upload_airway_bill: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['airway_bill'],
			},
			upload_draft_airway_bill: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_airway_bill'],
			},
		},
	};
	const bl_category = shipment_data?.bl_category?.toLowerCase() || 'mawb';
	if (bl_category === 'hawb' && data?.is_house_doc_uploaded) {
		return config?.mawb?.[data?.task];
	}
	return config[bl_category]?.[data?.task];
};

const fromDocsConfig = (data) => {
	const config = {
		upload_house_airway_bill: {
			getEndPoint: 'list_shipment_bl_details',
			params: { filters: { shipment_id: data?.shipment_id } },
			docs: ['house_airway_bill'],
		},
		upload_draft_house_airway_bill: {
			getEndPoint: 'get_shipment_service',
			params: { id: data?.service_id },
			docs: ['draft_house_airway_bill'],
		},
		upload_airway_bill: {
			getEndPoint: 'list_shipment_bl_details',
			params: { filters: { shipment_id: data?.shipment_id } },
			docs: ['airway_bill'],
		},
		upload_draft_airway_bill: {
			getEndPoint: 'get_shipment_service',
			params: { id: data?.service_id },
			docs: ['draft_airway_bill'],
		},
	};
	return config[data?.task] || {};
};

const uploadAirWayBill = (data, shipment_data) => {
	const fromDocs = data?.fromDocs;
	const { docs } = fromDocs
		? fromDocsConfig(data) || {}
		: configs(data, shipment_data) || {};
	const shipmentDetails = {
		name: 'update_shipment_details',
		end_point: 'update_shipment_service',
		data_from_api: [
			{ key: 'shipment_id', value: 'shipment_id' },
			{ key: [data.service_id], value: 'ids' },
			{ key: 'user_id', value: 'performed_by_org_id', alt: 'undefined' },
			{ key: 'air_freight_service', value: 'service_type' },
		],
		pay_load_variable: 'data',
		controls: [
			{
				label: 'Schedule Departure',
				name: 'schedule_departure',
				type: 'datepicker',
				value: date((shipment_data || {}).schedule_departure),
				withTimePicker: true,
				usePortal: true,
				span: 6,
				validations: [
					{ type: 'required', message: 'Schedule Departure  is required' },
				],
			},
			{
				label: 'Schedule Arrival',
				name: 'schedule_arrival',
				value: date((shipment_data || {}).schedule_arrival),
				type: 'datepicker',
				span: 6,
				withTimePicker: true,
				usePortal: true,
				validations: [
					{ type: 'required', message: 'Schedule Arrival  is required' },
				],
			},
			{
				label: 'Select No of stops',
				name: 'no_of_stops',
				type: 'switch-input',
				subType: 'new',
				valueDependent: true,
				span: 6,
				dependentValue: 'movement_details',
				disabled: true,
				min: 0,
				max: 5,
				value:
					(shipment_data?.movement_details || []).length > 0
						? (shipment_data.movement_details || []).length - 1
						: 0,
			},
			{
				heading: 'Movement Details',
				name: 'movement_details',
				type: 'fieldArray',
				isMovementDetails: true,
				isMovementPort: false,
				initialValue: getInitialValues(shipment_data),
				value:
					(shipment_data?.movement_details || []).length > 0
						? shipment_data.movement_details.map((item) => ({
								...item,
								service_type: 'air_freight_service',
						  }))
						: getInitialValues(shipment_data),
				initialCount: 1,
				controls: [
					{
						type: 'location-select',
						optionsListKey: 'locations',
						params: { filters: { type: ['airport'] } },
						caret: true,
						name: 'from_airport_id',
						label: 'Origin airport',
						placeholder: 'Search origin...',
						validations: [{ type: 'required', message: 'Origin is required' }],
					},
					{
						type: 'location-select',
						optionsListKey: 'locations',
						params: { filters: { type: ['airport'] } },
						caret: true,
						name: 'to_airport_id',
						label: 'Destination airport',
						placeholder: 'Search destination...',
						validations: [
							{ type: 'required', message: 'Destination is required' },
						],
					},
					{
						label: 'Schedule Departure',
						name: 'schedule_departure',
						type: 'datepicker',
						withTimePicker: true,
						usePortal: true,
						validations: [
							{
								type: 'required',
								message: 'Schedule Departure  is required',
							},
						],
					},
					{
						label: 'Schedule Arrival',
						name: 'schedule_arrival',
						type: 'datepicker',
						withTimePicker: true,
						usePortal: true,
						validations: [
							{
								type: 'required',
								message: 'Schedule Arrival  is required',
							},
						],
					},
					{
						name: 'flight_number',
						label: 'Flight number',
						type: 'text',
						placeholder: 'Flight Number',
					},
					{
						name: 'service_type',
						label: 'Service Type',
						type: 'text',
						show: false,
						placeholder: 'Type ',
					},
				],
			},
		],
	};
	const steps = (docs || []).map((docType, index) => {
		const isLast = index === docs.length - 1;
		return getStep(docType, isLast, data, shipment_data);
	});

	const requiredSteps =
		data?.task === 'upload_draft_airway_bill'
			? [...(steps || []), shipmentDetails]
			: steps;

	return requiredSteps;
};

export default uploadAirWayBill;
