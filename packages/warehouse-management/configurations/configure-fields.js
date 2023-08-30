import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const configureFields = [
	{
		key    : 'zoneName',
		label  : 'Zone name',
		span   : 0.8,
		render : (item) => (
			<div>
				{item?.zoneName}
			</div>
		),
	},
	{
		key    : 'commodity',
		label  : 'Commodity',
		span   : 1.2,
		render : (item) => (
			<div>
				{startCase(item?.commodity)}
			</div>
		),
	},
	{
		key    : 'aislesCount',
		label  : 'No. of Aisle Type',
		span   : 1,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.aislesCount || '-'}
			</div>
		),
	},
	{
		key    : 'racksCount',
		label  : 'No. of Racks',
		span   : 1.5,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.racksCount || '-'}
			</div>
		),
	},
	{
		key    : 'shelvesCount',
		label  : 'No. of Shelf in Rack',
		span   : 1.5,
		render : (item) => (
			<div>
				{item?.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.shelvesCount || '-'}
			</div>
		),
	},
	{
		key    : 'binDimensions',
		label  : 'Number / size of bin',
		span   : 1,
		render : (item) => (
			<div>
				{item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binsCount
					? `${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binsCount} 
					(${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binLength} 
						x ${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binWidth} x 
						${item.aisles?.[GLOBAL_CONSTANTS.zeroth_index]?.binHeight})` : '-'}
			</div>
		),
	},
	{
		key   : 'edit',
		label : 'Actions',
		span  : 0.4,
		func  : 'handleEdit',
	},
	{
		key   : 'delete',
		label : '',
		span  : 0.4,
		func  : 'handleDelete',
	},
];

export default configureFields;
