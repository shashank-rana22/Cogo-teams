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

const getValues = (document_type, data) => {
	if (
		document_type === 'bill_of_lading' ||
		document_type === 'house_bill_of_lading'
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
	const category = shipment_data?.bl_category?.toLowerCase() || 'mbl';
	const askFoMore =
		type === 'bill_of_lading' && data.shipment_type === 'fcl_freight';
	const askMoreDetails = askFoMore ? { type: 'bl', isConfirm: true } : null;
	if (
		category === 'hbl' &&
		(type === 'bill_of_lading' || type === 'draft_bill_of_lading')
	) {
		return { bls_count: 1, askMoreDetails };
	}
	return { bls_count: shipment_data?.bls_count || 1, askMoreDetails };
};

const getStep = (type, data, shipment_data) => {
	const { bls_count } = getStepConfig(type, shipment_data, data);

	return {
		controls: [
			{
				name: 'documents',
				type: 'childformat',
				showButtons: false,
				showDeleteButton: true,
				heading: 'Document',
				showDivider: true,
				isSectionRequired: true,
				value: getValues(type, data),
				initialCount: bls_count,
				noDeleteButtonTill: bls_count,
				childFormat: [
					{
						label: 'Document Description (optional)',
						name: 'description',
						type: 'textarea',
						span: 12,
						rows: 2,
					},
					...getControls(data, type),
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
		hbl: {
			upload_bill_of_lading: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['house_bill_of_lading', 'bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_house_bill_of_lading', 'draft_bill_of_lading'],
			},
		},
		mbl: {
			upload_bill_of_lading: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_bill_of_lading'],
			},
		},
		inhouse_hbl: {
			upload_bill_of_lading: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_bill_of_lading'],
			},
		},
		agent_hbl: {
			upload_bill_of_lading: {
				getEndPoint: 'list_shipment_bl_details',
				params: { filters: { shipment_id: data.shipment_id } },
				docs: ['bill_of_lading'],
			},
			upload_draft_bill_of_lading: {
				getEndPoint: 'get_shipment_service',
				params: { id: data.service_id },
				docs: ['draft_bill_of_lading'],
			},
		},
	};
	const bl_category = shipment_data?.bl_category?.toLowerCase() || 'mbl';
	if (bl_category === 'hbl' && data?.is_house_doc_uploaded) {
		return config?.mbl?.[data?.task];
	}
	return config[bl_category]?.[data?.task];
};

const fromDocsConfig = (data) => {
	const config = {
		upload_house_bill_of_lading: {
			getEndPoint: 'list_shipment_bl_details',
			params: { filters: { shipment_id: data?.shipment_id } },
			docs: ['house_bill_of_lading'],
		},
		upload_draft_house_bill_of_lading: {
			getEndPoint: 'get_shipment_service',
			params: { id: data?.service_id },
			docs: ['draft_house_bill_of_lading'],
		},
		upload_bill_of_lading: {
			getEndPoint: 'list_shipment_bl_details',
			params: { filters: { shipment_id: data?.shipment_id } },
			docs: ['bill_of_lading'],
		},
		upload_draft_bill_of_lading: {
			getEndPoint: 'get_shipment_service',
			params: { id: data?.service_id },
			docs: ['draft_bill_of_lading'],
		},
	};
	return config[data?.task] || {};
};

const uploadBillOfLading = (data, shipment_data) => {
	const fromDocs = data?.fromDocs;
	const { docs } = fromDocs
		? fromDocsConfig(data) || {}
		: configs(data, shipment_data) || {};
	const steps = docs?.map((docType, index) => {
		const isLast = index === docs.length - 1;
		return getStep(docType, isLast, data, shipment_data);
	});

	return steps;
};

export default uploadBillOfLading;
