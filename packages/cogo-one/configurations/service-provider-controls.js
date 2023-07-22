export const ORIGIN_LABEL_MAPPING = {
	fcl_freight : 'Origin Port',
	lcl_freight : 'Origin Port',
	air_freight : 'Origin',
};

export const DESTINATION_LABEL_MAPPING = {
	fcl_freight : 'Destination Port',
	lcl_freight : 'Destination Port',
	air_freight : 'Destination',
};

export const ROUTE_MAPPING = {
	fcl_freight : 'seaport',
	lcl_freight : 'seaport',
	air_freight : 'airport',
};

const getControls = ({
	serviceType,
	setPortDetails = () => {},
}) => [
	{
		name        : 'service_type',
		label       : 'Select Service',
		controlType : 'select',
		placeholder : 'Select Service Type',
		size        : 'sm',
		rules       : { required: 'Please Select Service' },
		options     : [
			{ label: 'FCL Freight', value: 'fcl_freight' },
			{ label: 'LCL Freight', value: 'lcl_freight' },
			{ label: 'Air Freight', value: 'air_freight' },
		],
	},
	{
		label       : ORIGIN_LABEL_MAPPING[serviceType],
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
		},
		initialCall : true,
		params      : { filters: { type: [ROUTE_MAPPING[serviceType]] } },
	},
	{
		label       : DESTINATION_LABEL_MAPPING[serviceType],
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
		},
		initialCall : true,
		params      : { filters: { type: [ROUTE_MAPPING[serviceType]] } },

	},
];
export default getControls;
