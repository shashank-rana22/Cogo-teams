const scheduleFields = {
	fields: [
		{
			key    : 'wh_transfer_id',
			label  : 'WH Transfer ID',
			span   : 1.5,
			render : (item) => {
				<div>
					{item.transfer_id}
				</div>;
			},
		},
		{
			key    : 'sid_count',
			label  : 'No. of SIDs',
			span   : 2.5,
			render : (item) => {
				<div>
					{item.sid_count}
				</div>;
			},
		},
		{
			key    : 'truck_in_eta',
			label  : 'Truck-in ETA',
			span   : 1.5,
			render : (item) => {
				<div>
					{item.truck_in_eta}
				</div>;
			},
		},
		{
			key    : 'truck_type',
			label  : 'Truck type',
			span   : 2.5,
			render : (item) => {
				<div>
					{item.truck_type}
				</div>;
			},
		},
		{
			key    : 'truck_number',
			label  : 'Truck Number',
			span   : 1,
			render : (item) => {
				<div>
					{item.truck_number}
				</div>;
			},
		},
		{
			key    : 'truck_size',
			label  : 'Truck Size',
			span   : 1,
			render : (item) => {
				<div>
					{item.truck_size}
				</div>;
			},
		},
		{
			key    : 'driver_contact_number',
			label  : 'Driver Contact Number',
			span   : 2.2,
			render : (item) => {
				<div>
					{item.driver_contact_number}
				</div>;
			},
		},
		{
			key    : 'boxes_dimensions_weight',
			label  : 'Boxes/Dimensions/Weight',
			span   : 2.2,
			render : (item) => {
				<div>
					{item.dimensions}
				</div>;
			},
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 2.2,
			func  : 'handleTruckStatus',
		},
	],
};

export default scheduleFields;
