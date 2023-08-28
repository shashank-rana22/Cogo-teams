import { Button } from '@cogoport/components';
import { startCase, getByKey, isEmpty } from '@cogoport/utils';

const organizationColumn = () => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => <div>{getByKey(row, 'name') }</div>,
	},
	{
		Header   : 'Email',
		id       : 'email',
		accessor : (row) => <div>{getByKey(row, 'email') }</div>,
	},
	{
		Header   : 'Mobile Number',
		accessor : (row) => (
			<div>
				<div>{getByKey(row, 'mobile_number') }</div>
			</div>
		),
	},

	{
		Header   : 'Work Scopes',
		accessor : (row) => (
			<div>
				{!isEmpty(row?.work_scopes) ? (
					<div>
						{(getByKey(row, 'work_scopes')).map((val) => (
							<div key={val}>{startCase(val)}</div>
						))}
					</div>
				) : (
					'-'
				)}
			</div>
		),
	},
	{
		Header   : '',
		accessor : () => <Button>Place Call</Button>,
		id       : 'mobile',
	},
];

export default organizationColumn;
