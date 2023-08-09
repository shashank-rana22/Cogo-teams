/* eslint-disable max-len */

import { startCase } from '@cogoport/utils';

/* eslint-disable react/jsx-one-expression-per-line */
const inventoryFields = {
	fields: [
		{
			key    : 'sid',
			label  : 'SID No.',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.shipmentId}
				</div>
			),
		},
		{
			key   : 'warehouseLocation',
			label : 'Warehouse Location',
			span  : 2.5,
			func  : 'handleWarehouseLocation',
		},
		{
			key    : 'noOfBoxes',
			label  : 'No. of Boxes',
			span   : 1.5,
			render : (item) => (
				<div>
					{item?.noOfBoxes}
				</div>
			),
		},
		{
			key   : 'services',
			label : 'Services',
			span  : 1,
			func  : 'handleServices',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
	],
	showMoreFields: [
		{
			key    : 'cargoNumber',
			label  : 'Cargo Number',
			span   : 2.2,
			render : (item) => (
				<div>
					{item?.cargoNumber}
				</div>
			),
		},
		{
			key    : 'warehouseLocation',
			label  : 'Warehouse Location',
			span   : 2.2,
			render : (item) => (
				<div>
					{item?.warehouseLocation?.zoneNumber}-{item?.warehouseLocation?.aisleNumber}-{item?.warehouseLocation?.rackNumber}-{item?.warehouseLocation?.shelfNumber}-{item?.warehouseLocation?.binNumber}
				</div>
			),
		},
		{
			key    : 'dimensions',
			label  : 'Dimensions',
			span   : 2.2,
			render : (item) => (
				<div>
					{`${item?.dimensions?.length ?? '0'} x ${item?.dimensions?.width ?? '0'} x ${item?.dimensions?.height ?? '0'} `}
				</div>
			),
		},
		{
			key    : 'service',
			label  : 'Services',
			span   : 2.2,
			render : (item) => (
				<div>
					{startCase(item?.serviceName)}
				</div>
			),
		},
		{
			key    : 'status',
			label  : 'Status',
			span   : 2.2,
			render : (item) => (
				<div>
					{startCase(item?.serviceStatus)}
				</div>
			),
		},
		{
			key   : 'update',
			label : 'Actions',
			span  : 2.1,
			func  : 'handleUpdateStatus',
		},
	],
};

export default inventoryFields;
