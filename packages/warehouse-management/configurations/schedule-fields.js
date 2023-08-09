const scheduleFields = (truckStatus = 'truck_in') => ({
	fields: [
		{
			key    : 'wh_transfer_id',
			label  : 'WH Transfer ID',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.warehouseTransferSerialId}
				</div>
			),
		},
		{
			key    : 'sid_count',
			label  : 'No. of SIDs',
			span   : 2.5,
			render : (item) => (
				<div>
					{item?.shipmentDetails?.length}
				</div>
			),
		},
		{
			key    : truckStatus === 'truck_in' ? 'truck_in_eta' : 'truck_out_eta',
			label  : truckStatus === 'truck_in' ? 'Truck-in ETA' : 'Truck-out ETA',
			span   : 1.5,
			render : (item) => (
				<div>
					{truckStatus === 'truck_in' ? item?.truckInEta : item?.truckOutEta}
				</div>
			),
		},
		{
			key    : 'truck_type',
			label  : 'Truck type',
			span   : 2.5,
			render : (item) => (
				<div>
					{item?.truckDetails?.truckType}
				</div>
			),
		},
		{
			key    : 'truck_number',
			label  : 'Truck Number',
			span   : 1,
			render : (item) => (
				<div>
					{item?.truckDetails?.truckNumber}
				</div>
			),
		},
		{
			key    : 'truck_size',
			label  : 'Truck Size',
			span   : 1,
			render : (item) => (
				<div>
					{item.truckDetails?.truckSize}
				</div>
			),
		},
		{
			key    : 'driver_contact_number',
			label  : 'Driver Contact Number',
			span   : 2.2,
			render : (item) => (
				<div>
					{item?.truckDetails?.driverContactNumber}
				</div>
			),
		},
		{
			key   : 'action',
			label : 'Actions',
			span  : 2.2,
			func  : 'handleTruckStatus',
		},
	],
	showMoreFields: [
		{
			key   : 'serialID',
			label : 'SID No.',
			span  : 2.2,
			func  : 'handleSID',
		},
		{
			key   : 'boxCount',
			label : 'Boxes',
			span  : 2.2,
			func  : 'handleBoxCount',
		},
		{
			key   : 'boxDimensions',
			label : 'Box Dimensions',
			span  : 2.2,
			func  : 'handleBoxDimensions',
		},
		{
			key   : 'services',
			label : 'Services',
			span  : 2.2,
			func  : 'handleServices',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 2.2,
			func  : 'handleStatus',
		},
		{
			key   : 'flightSchedule',
			label : 'Flight Schedule',
			span  : 2.2,
			func  : 'handleFlightSchedule',
		},
		{
			key   : 'expectedDepartureTime',
			label : 'Expected dept. Time',
			span  : 2.1,
			func  : 'handleExpectedDeparture',
		},
	],
});

export default scheduleFields;
