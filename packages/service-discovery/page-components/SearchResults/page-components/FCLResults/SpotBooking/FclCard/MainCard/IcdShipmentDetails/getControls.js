const getControls = ({
	isOriginIcd = false,
	isDestinationIcd = false,
}) => [
	{
		label    : 'Origin Main Port',
		show     : isOriginIcd,
		type     : 'async-select',
		rules    : { required: 'Origin Main port is required' },
		name     : 'origin_main_port_id',
		asyncKey : 'list_locations',
	},
	{
		label    : 'Destination Main Port',
		show     : isDestinationIcd,
		type     : 'async-select',
		rules    : { required: 'Destination Main port is required' },
		name     : 'destination_main_port_id',
		asyncKey : 'list_locations',
	},
];

export default getControls;
