import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const scheduleFields = (truckStatus = 'truck_in') => ({
	fields: [
		{
			key    : 'wh_transfer_id',
			label  : 'WH Transfer ID',
			span   : 2,
			render : (item) => (
				<div>
					{item?.warehouseTransferSerialId}
				</div>
			),
		},
		{
			key    : 'sid_count',
			label  : 'No. of SIDs',
			span   : 1,
			render : (item) => (
				<div>
					{item?.shipmentDetails?.length}
				</div>
			),
		},
		{
			key    : truckStatus === 'truck_in' ? 'truck_in_eta' : 'truck_out_eta',
			label  : truckStatus === 'truck_in' ? 'Truck-in ETA' : 'Truck-out ETA',
			span   : 2,
			render : (item) => (
				<div>
					{truckStatus === 'truck_in' ? item?.truckInEta : item?.truckOutEta}
				</div>
			),
		},
		{
			key    : 'transporter_name',
			label  : 'Transporter Name',
			span   : 1,
			render : (item) => (
				<div>
					{item?.truckDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.transporter_name}
				</div>
			),
		},
		{
			key    : 'truck_number',
			label  : 'Truck Number',
			span   : 2,
			render : (item) => (
				<div>
					{item?.truckDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.truck_number}
				</div>
			),
		},
		{
			key    : 'driver_name',
			label  : 'Driver Name',
			span   : 1,
			render : (item) => (
				<div>
					{item.truckDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.driver_name}
				</div>
			),
		},
		{
			key    : 'driver_contact_number',
			label  : 'Driver Contact Number',
			span   : 2,
			render : (item) => (
				<div>
					{item?.truckDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.driver_contact_number}
				</div>
			),
		},
		{
			key   : 'action',
			label : 'Actions',
			span  : 1,
			func  : 'handleTruckStatus',
		},
	],
	showMoreFields: [
		{
			key   : 'serialID',
			label : 'SID No.',
			span  : 2,
			func  : 'handleSID',
		},
		{
			key   : 'boxCount',
			label : 'Boxes',
			span  : 1,
			func  : 'handleBoxCount',
		},
		{
			key   : 'boxDimensions',
			label : 'Box Dimensions',
			span  : 2,
			func  : 'handleBoxDimensions',
		},
		{
			key   : 'services',
			label : 'Services',
			span  : 2,
			func  : 'handleServices',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
		{
			key   : 'flightSchedule',
			label : 'Flight Schedule',
			span  : 2,
			func  : 'handleFlightSchedule',
		},
		{
			key   : 'expectedDepartureTime',
			label : 'Expected dept. Time',
			span  : 2,
			func  : 'handleExpectedDeparture',
		},
	],
});

export default scheduleFields;
