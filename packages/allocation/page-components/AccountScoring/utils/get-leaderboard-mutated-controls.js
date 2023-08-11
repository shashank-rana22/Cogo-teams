const getMutatedControls = ({ controls, service, bulkDeallocateFilter, duration }) => {
	const CONTROL_CONFIGURATION = {
		user_id : { prop: 'disabled', value: false, condition: service },
		role_id : { prop: 'disabled', value: false, condition: service },
		warmth  : {
			prop  : 'options',
			value : [
				{ label: 'Ice Cold', value: 'ice_cold' },
				{ label: 'Cold', value: 'cold' },
			],
			condition: bulkDeallocateFilter,
		},
		date_range: { prop: 'disable', value: false, condition: duration === 'custom' },
	};

	return controls.map((singleControl) => {
		let newControl = { ...singleControl };

		if (CONTROL_CONFIGURATION[newControl.name] && CONTROL_CONFIGURATION[newControl.name].condition) {
			newControl = {
				...newControl,
				[CONTROL_CONFIGURATION[newControl.name].prop]: CONTROL_CONFIGURATION[newControl.name].value,
			};
		}

		return newControl;
	});
};

export default getMutatedControls;
