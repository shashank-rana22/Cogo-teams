const controls = (airInput, localAirInput) => {
	return [
		{
			name: 'local_airline_id',
			type: 'select',
			value: localAirInput?.airline_id,
			optionsListKey: 'air-lines',
			disabled: true,
			rules: { required: 'Air Line Details is Required' },
			caret: false,
			labelKey: 'business_name',
		},
		{
			name: 'local_service_provider_id',
			type: 'select',
			value: localAirInput?.service_provider_id,
			optionsListKey: 'verified-service-providers',
			disabled: true,
			caret: false,
		},
		{
			name: 'airline_id',
			type: 'select',
			value: airInput?.airline_id,
			optionsListKey: 'air-lines',
			disabled: true,
			rules: { required: 'Air Line Details is Required' },
			caret: false,
			labelKey: 'business_name',
		},
		{
			name: 'service_provider_id',
			type: 'select',
			value: airInput?.service_provider_id,
			optionsListKey: 'verified-service-providers',
			disabled: true,
			caret: false,
		},
	];
};

export default controls;
