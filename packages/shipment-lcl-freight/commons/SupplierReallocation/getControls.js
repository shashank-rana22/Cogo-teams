import { isEmpty } from '@cogoport/utils';

const SPLICE_FIRST_PARAMETER = 0;
const SPLICE_SECOND_PARAMETER = 1;
const SPLIT_SERVICE_TEXT = 2;

export default function getControls({
	primary_service = {},
	serviceObj = {},
	shipment_type,
	documents,
	isAdditional,
	trade_type,
	payment_term,
}) {
	const { service_provider, service_type, bls_count, bl_category } = serviceObj || {};

	const showAllControls = isEmpty(documents) && !isAdditional && `${shipment_type}_service` === service_type;
	const serviceType = serviceObj?.service_type.split('_', SPLIT_SERVICE_TEXT).join('_');
	const shipmentType = shipment_type.split('_', SPLIT_SERVICE_TEXT).join('_');
	let services = [];

	if (primary_service?.service_type !== service_type) {
		services = [shipmentType, serviceType];
	}
	if (serviceObj?.service_type === 'trailer_freight_service'
	|| serviceObj?.service_type === 'haulage_freight_service'
	|| serviceObj?.service_type === 'ftl_freight_service') {
		services = ['ftl_freight', 'haulage_freight'];
	}

	const blCategoryOptions = trade_type === 'export' && payment_term === 'prepaid'
		? [{ label: 'Mbl', value: 'mbl' },
			{ label: 'Hbl', value: 'hbl' }]
		: [{ label: 'Hbl', value: 'hbl' }];

	const controls = [
		{
			name        : 'service_provider_id',
			label      	: 'Service Provider',
			type        : 'asyncSelect',
			placeholder : 'Select Service Provider',
			asyncKey    : 'organizations',
			params      : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					service      : Array.isArray(services)
						? services : serviceType,
				},
			},
			size  : 'sm',
			rules : { required: 'Service Provider is required' },
		},
		{
			name        : 'bls_count',
			label       : 'BL Count',
			type        : 'number',
			placeholder : 'Enter BL Count',
			size        : 'sm',
			rules       : {
				required : 'BL Count required',
				min      : {
					value   : 1,
					message : 'BL count cannot be less than 0',
				},
			},
		},
		{
			name        : 'bl_category',
			label       : 'BL Category',
			type        : 'select',
			options     : blCategoryOptions,
			placeholder : 'Enter Bl Category',
			size        : 'sm',
			rules       : { required: 'BL Category is required' },
		},
	];

	const showControls = showAllControls ? controls : controls.splice(SPLICE_FIRST_PARAMETER, SPLICE_SECOND_PARAMETER);

	return {
		controls      : showControls,
		defaultValues : {
			service_provider_id: service_provider?.id,
			...(showAllControls ? {
				bls_count,
				bl_category,
			} : {}),
		},
		showAllControls,
	};
}
