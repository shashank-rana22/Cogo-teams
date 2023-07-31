import { startCase } from '@cogoport/utils';

const getColumns = () => [
	{
		Header   : 'KRA NAME',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'KRA DESCRIPTION',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_description) || '-'}
			</div>
		),
	},
	{
		Header   : 'OPERATION KEY',
		accessor : (item) => (
			<div>
				{startCase(item?.operation_key) || '-'}
			</div>
		),
	},

];

export default getColumns;
