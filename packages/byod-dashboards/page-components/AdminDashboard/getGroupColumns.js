import { startCase } from '@cogoport/utils';

const getGroupColumns = () => [
	{
		Header   : 'Department',
		accessor : (item) => (
			<div>{startCase(item?.department?.department_name) || '-'}</div>
		),
	},

	{
		Header   : 'Designation',
		accessor : (item) => (
			<div>{startCase(item?.role?.role_name) || '-'}</div>
		),
	},

];

export default getGroupColumns;
