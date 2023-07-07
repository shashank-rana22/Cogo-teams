import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getColumns = ({ handleEditKRA }) => [
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
	{
		Header   : 'Edit KRA',
		accessor : (item) => (
			<Button size="xs" onClick={() => handleEditKRA(item?.id)}>
				Edit
			</Button>
		),
	},
];

export default getColumns;
