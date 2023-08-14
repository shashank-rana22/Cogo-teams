import { Button, ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getReimbursementColumns = () => [
	{
		Header   : 'Department',
		accessor : (item) => (
			<div>{startCase(item?.department) || '-'}</div>
		),
	},

	{
		Header   : 'Designation',
		accessor : (item) => (
			<div>{startCase(item?.designation) || '-'}</div>
		),
	},

	{
		Header   : 'Action',
		accessor : () => (
			<Button themeType="secondary">
				View Employees
			</Button>
		),
	},
	{
		id       : 'delete',
		Header   : '',
		accessor : (item) => (
			<ButtonIcon size="md" icon={<IcMDelete />} themeType="primary" />
		),
	},

];

export default getReimbursementColumns;
