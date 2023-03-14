/* eslint-disable max-len */
import getGeoConstants from '@cogo/globalization/constants/geo';

const geo = getGeoConstants();
const configg = () => {
	return {
		get_apis: [],
		ui_config: [
			{
				name: 'mark_confirmed',
				heading: 'Mark Confirmed',
				controls: [
					{
						label: 'Contact Status with Shipper',
						name: 'shipper_contact_status',
						type: 'pills',
						span: 6,
						options: [{ label: 'Confirmed', value: 'confirmed' }],
						rules: { required: { value: true, message: 'This is required' } },
						subHeading: 'update_contact_status_with_shipper',
					},
					{
						label: 'Reason',
						name: 'shipper_contact_status_remarks',
						type: 'text',
						subHeading: 'update_contact_status_with_shipper',
						conditions: [
							{
								key_to_add: 'value',
								condition: {
									leftValue: 'data.shipper_contact_status_remarks.length',
									rightValue: 1,
									operator: '===',
								},
								value: 'data.shipper_contact_status_remarks',
								elseValue: null,
							},
							{
								key_to_add: 'rules',
								condition: {
									leftValue: { type: 'func', name: 'getShipperStatus' },
									rightValue: true,
									operator: '===',
								},
								value: {
									required: {
										value: true,
										message: 'Not Contacted Reason is required',
									},
								},
								elseValue: null,
							},
						],
					},
					{
						label: 'HS Code',
						name: 'hs_code',
						type: 'creatable-select',
						caret: true,
						optionsListKey: 'hs_codes',
						span: 6,
						subHeading: 'update_commodity_name_hs_code_description',
					},
					{
						label: 'Choose commodity description',
						name: 'commodity_description',
						type: 'textarea',
						rows: 5,
						span: 6,
						rules: { required: { value: true, message: 'This is required' } },
						subHeading: 'update_commodity_name_hs_code_description',
					},
					{
						name: 'cargo_readiness_date',
						label: 'Container pickup date',
						type: 'datepicker',
						span: 6,
						usePortal: true,
						placeholder: 'Select',
						rules: { required: { value: true, message: 'This is required' } },
						subHeading: 'update_cargo_readiness_date',
					},
					{
						name: 'cargo_stuffing_location',
						label: 'Cargo stuffing location',
						type: 'textarea',
						rows: 5,
						span: 6,
						rules: { required: { value: true, message: 'This is required' } },
						subHeading: 'update_cargo_stuffing_location',
					},
					{
						name: 'origin_cargo_handling_type',
						type: 'pills',
						value: 'stuffing_at_factory',
						options: [
							{ value: 'stuffing_at_factory', label: 'Factory Stuffing' },
							{ value: 'stuffing_at_dock', label: 'Dock Stuffing' },
						],
						rules: { required: { value: true, message: 'This is required' } },
						subHeading: 'update_origin_cargo_handling_type',
					},
					{
						name: 'destination_cargo_handling_type',
						type: 'select-2',
						selectType: 'pills',
						value: 'direct_port_delivery',
						span: 12,
						conditions: [
							{
								condition: {
									key_to_add: 'options',
									leftValue: 'data.inco_term',
									rightValue: 'ddp',
									operator: '===',
								},
								value: [
									{
										value: 'dpd_without_cfs',
										label: 'DPD without CFS',
									},
									{
										value: 'dpd_cfs_dock_destuffing',
										label: 'DPD CFS Dock Destuffing ',
									},
									{
										value: 'dpd_cfs_factory_destuffing',
										label: 'DPD CFS Factory Destuffing',
									},
								],
								elseValue: [
									{
										value: 'direct_port_delivery',
										label: 'Direct Port Delivery',
									},
									{
										value: 'delivery_from_dock',
										label: 'Destuffing at Factory',
									},
									{
										value: 'destuffing_at_dock',
										label: 'Destuffing at CFS',
									},
									{
										value: 'dpd_without_cfs',
										label: 'DPD without CFS',
									},
									{
										value: 'dpd_cfs_dock_destuffing',
										label: 'DPD CFS Dock Destuffing ',
									},
									{
										value: 'dpd_cfs_factory_destuffing',
										label: 'DPD CFS Factory Destuffing',
									},
									{
										value: 'enpanelled_cfs_dock_destuffing',
										label: 'Enpanelled CFS Dock Destuffing',
									},
									{
										value: 'enpanelled_cfs_factory_destuffing',
										label: 'Enpanelled CFS Factory Destuffing',
									},
									{
										value: 'non_enpanelled_cfs_dock_destuffing',
										label: 'Non-Enpanelled CFS Dock Destuffing',
									},
									{
										value: 'non_enpanelled_cfs_factory_destuffing',
										label: 'Non-Enpanelled CFS Factory Destuffing',
									},
								],
								subHeading: 'destination_cargo_handling_type',
							},
						],
					},
					{
						name: 'msds_cerficate_documents',
						type: 'fieldArray',
						showButtons: true,
						showDeleteButton: true,
						isSectionRequired: true,
						initialCount: 1,
						noDeleteButtonTill: 1,
						buttonText: 'Add more documents',
						subHeading: 'upload_msds_certificate',
						controls: [
							{
								label: 'Document Description (optional)',
								name: 'description',
								type: 'textarea',
								span: 6,
								rows: 2,
							},
							{
								name: 'url',
								showLabel: false,
								span: 6,
								type: 'file',
								themeType: 'secondary',
								drag: true,
								isShipment: true,
								uploadIcon: 'ic-upload',
								document_type: 'msds_certificate',
								label: '',
								accept:
									'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								subHeading: 'msds_certificate',
								uploadType: 'aws',
								rules: {
									required: { value: true, message: 'This is required' },
								},
							},
						],
					},
					{
						name: 'iip_certificate_documents',
						type: 'fieldArray',
						showButtons: true,
						showDeleteButton: true,
						isSectionRequired: true,
						initialCount: 1,
						noDeleteButtonTill: 1,
						subHeading: 'upload_iip_certificate',
						buttonText: 'Add more documents',
						controls: [
							{
								label: 'Document Description (optional)',
								name: 'description',
								type: 'textarea',
								span: 6,
								rows: 2,
							},
							{
								name: 'url',
								showLabel: false,
								span: 6,
								type: 'file',
								themeType: 'secondary',
								drag: true,
								isShipment: true,
								uploadIcon: 'ic-upload',
								document_type: 'iip_certificate',
								label: '',
								accept:
									'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
								uploadType: 'aws',
								rules: {
									required: { value: true, message: 'This is required' },
								},
							},
						],
					},
					{
						label: 'Payment terms',
						name: 'payment_term',
						type: 'pills',
						span: 6,
						options: [
							{ label: 'Prepaid', value: 'prepaid' },
							{ label: 'Collect', value: 'collect' },
						],
						conditions: [
							{
								key_to_add: 'value',
								condition: {
									leftValue: { type: 'func', name: 'getTradeType' },
									rightValue: 'export',
									operator: '===',
								},
								value: 'prepaid',
								elseValue: 'collect',
							},
						],
						subHeading: 'upload_payment_term',
						placeholder: 'Enter Payment',
						rules: {
							required: { value: true, message: 'Payment term is required' },
						},
					},
					{
						name: 'preferred_container_pickup_location_id',
						label: 'Preferred container pickup location',
						type: 'location-select',
						optionsListKey: 'locations',
						span: 6,
						placeholder: 'Select',
						subHeading: 'update_preferred_container_pickup_location',
						conditions: [
							{
								key_to_add: 'params',
								condition: {
									leftValue: 'data.origin_port.country.country_code',
									rightValue: geo.country.currency.code,
									operator: '===',
								},
								value: {
									filters: {
										type: ['seaport'],
										country_id: 'data.origin_port.country.id',
									},
								},
								elseValue: { filter: { type: ['seaport'] } },
							},
						],
						rules: { required: { value: true, message: 'This is required' } },
					},
					{
						name: 'preferred_container_handover_location_id',
						label: 'Preferred container handover location',
						type: 'location-select',
						optionsListKey: 'locations',
						span: 6,
						placeholder: 'Select',
						subHeading: 'update_preferred_container_handover_location',
						conditions: [
							{
								key_to_add: 'params',
								condition: {
									leftValue: 'data.origin_port.country.country_code',
									rightValue: geo.country.currency.code,
									operator: '===',
								},
								value: {
									filters: {
										type: ['seaport'],
										country_id: 'data.origin_port.country.id',
									},
								},
								elseValue: { filters: { type: ['seaport'] } },
							},
						],
						rules: { required: { value: true, message: 'This is required' } },
					},
					{
						name: 'bl_category',
						label: 'Choose Category of Bill of Lading',
						type: 'pills',
						conditions: [
							{
								key_to_add: 'value',
								condition: {
									leftValue: 'getTradeType',
									rightValue: 'export',
									operator: '===',
								},
								value: 'mbl',
								elseValue: 'hbl',
							},
						],
						options: [
							{
								value: 'hbl',
								label: 'HBL',
								description: 'House Bill of Lading',
							},
							{
								value: 'mbl',
								label: 'MBL',
								description: 'Master Bill of Lading',
							},
						],
						subHeading: 'update_bl_type',
						span: 6,
						placeholder: 'Category',
						rules: {
							required: { value: true, message: 'Bl Category is required' },
						},
					},
					{
						name: 'bl_type',
						label: 'Choose preferred Bill of Lading',
						type: 'pills',
						value: 'sob',
						options: [
							{
								value: 'rfs',
								label: 'RFS (Original)',
								description:
									'The RFS (Original)( Received for Shipment) Bill of Lading is generated once the container is gated inside the port for shipment. It acts as a proof of goods being received for sailing, post custom clearance. It can be helpful when the transit time of the shipment is less than a week',
							},
							{
								value: 'sob',
								label: 'SOB (Original)',
								description:
									'The SOB (Original)(Shipped on Board) Bill of Lading is generated once the shipment has sailed. It acts as a proof that cargo has been loaded on the ship and the ship has sailed. SOB (Original) Bill of Lading is submitted as a document to claim the money in cases of Letter of Credit',
							},
							{
								value: 'seaway',
								label: 'Seaway (Original)',
								description:
									'The Seaway (Original) Bill is given directly to the consignee. The exporter receives an E-copy as a proof. It can be used when the goods are already paid for with approved line of credit, or there is a high level of trust between the exporter and consignee',
							},
						],
						span: 6,
						placeholder: 'Type',
						subHeading: 'update_bl_type',
						rules: {
							required: { value: true, message: 'Bl type is required' },
						},
					},
					{
						name: 'bls_count',
						label: 'BL Count',
						type: 'number',
						span: 4,
						value: 1,
						min: 1,
						placeholder: 'Type',
						subHeading: 'update_bl_type',
						rules: {
							required: {
								value: true,
								message: 'Bl Count is required',
							},
						},
					},
				],
			},
		],
	};
};

export default configg;
