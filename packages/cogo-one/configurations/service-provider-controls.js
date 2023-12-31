const PORT_PAIR_LABEL_MAPPING = {
	fcl_freight: {
		origin      : 'Origin Port',
		destination : 'Destination Port',
	},
	lcl_freight: {
		origin      : 'Origin Port',
		destination : 'Destination Port',
	},
	air_freight: {
		origin      : 'Origin',
		destination : 'Destination',
	},
};

export const ROUTE_MAPPING = {
	fcl_freight : 'seaport',
	lcl_freight : 'seaport',
	air_freight : 'airport',
};

const getControls = ({
	serviceType,
	setPortDetails = () => {},
	handleReset = () => {},
	setModalType = () => {},
	setSelectedUsers = () => {},
	setListServiceProviders = () => {},
}) => {
	const handleCall = () => {
		setModalType('');
		setSelectedUsers({});
		setListServiceProviders([]);
	};

	return [
		{
			name        : 'service_type',
			label       : 'Select Service',
			controlType : 'select',
			placeholder : 'Select Service Type',
			size        : 'sm',
			onChange    : (val) => { handleReset({ val }); },
			rules       : { required: 'Please Select Service' },
			options     : [
				{ label: 'FCL Freight', value: 'fcl_freight' },
				{ label: 'LCL Freight', value: 'lcl_freight' },
				{ label: 'Air Freight', value: 'air_freight' },
			],
		},
		{
			label       : PORT_PAIR_LABEL_MAPPING[serviceType].origin,
			name        : 'origin_port_id',
			placeholder : 'Select Origin Port',
			controlType : 'asyncSelect',
			rules       : { required: 'Origin Port is Required' },
			asyncKey    : 'list_locations',
			size        : 'sm',
			onChange    : (_, obj) => {
				setPortDetails((prevState) => ({
					...prevState,
					originDetails: obj,
				}));
				handleCall();
			},
			initialCall : true,
			params      : { filters: { type: [ROUTE_MAPPING[serviceType]] } },
		},
		{
			label       : PORT_PAIR_LABEL_MAPPING[serviceType].destination,
			name        : 'destination_port_id',
			placeholder : 'Select Destination Port',
			controlType : 'asyncSelect',
			rules       : { required: 'Destination Port is Required' },
			asyncKey    : 'list_locations',
			size        : 'sm',
			onChange    : (_, obj) => {
				setPortDetails((prevState) => ({
					...prevState,
					destinationDetails: obj,
				}));
				handleCall();
			},
			initialCall : true,
			params      : { filters: { type: [ROUTE_MAPPING[serviceType]] } },

		},
	];
};
export default getControls;
